let blogRouter = require("express").Router();
let Blog = require("../models/blog_model");
let User = require("../models/user_model");
let jwt = require("jsonwebtoken");
let config = require("../utils/config");

blogRouter.get("/api/blogs", (request, response) => {
  Blog.find({})
    .populate("user")
    .then((blogs) => {
      response.status(200).json(blogs);
    });
});
blogRouter.post("/api/blogs", async (request, response, next) => {
  let token = request.token;
  console.log("token", token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (err) {
    return next(err);
  }

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Unauthorized" });
  }
  const user = await User.findById(decodedToken.id);
  if (!request.body.likes) {
    request.body.likes = 0;
  }
  if (!request.body.url || !request.body.title) {
    response.status(400).json(request.body);
  } else {
    let document = { ...request.body, user: user._id };
    const blog = new Blog(document);
    blog
      .save()
      .then((result) => {
        User.updateOne(
          { _id: user._id },
          {
            $addToSet: {
              blogs: result._id,
            },
          },
        )
        response.status(201).json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
});
blogRouter.get("/api/blogs/:id", (request, response) => {
  let id = request.params.id;
  Blog.findById(id)
    .then((res) => {
      response.status(200).send(res);
    })
    .catch((err) => {
      response.status(404).send(err.message);
    });
});

blogRouter.delete("/api/blogs/:id", async (request, response, next) => {
  let token = request.token;
  console.log("token", token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (err) {
    return next(err);
  }
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({
        error: "Unauthorized",
        reason:
          "unable to verify user, please try to log out and login again to verify that it is you.",
      });
  }
  let id = request.params.id;
  let blogCreator = await Blog.findOne({ _id: id });
  console.log("delete VERIRy decoded token----------------------------------------------", blogCreator,decodedToken)
  console.log("blog Createor", blogCreator , decodedToken,blogCreator.author === decodedToken.username )
  blogCreator = blogCreator.author;
  if (blogCreator === decodedToken.username) {
    Blog.deleteOne({ _id: id })
      .then((res) => {
        console.log("id", id, "deleted", res);
        response.status(204).json(res);
      })
      .catch((err) => {
        console.error("unable to delete ", id, err.message);
        response.status(400).send(err.message);
      });
  } else {
    response
      .status(401)
      .json({
        error: "Unauthorized",
        reason: "You didn't create this blog. Only the owner can delete it",
      });
  }
});
blogRouter.put("/api/blogs/:id", (request, response, next) => {
  let token = request.token;
  console.log("token", token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.SECRET);
  } catch (err) {
    return next(err);
  }
  if (!decodedToken.id) {
    return response.status(401).json({ error: "Unauthorized" });
  }

  let id = request.params.id;
  let updateDoc = {};
  if (request.body.type === "like") {
    updateDoc = {
      $inc: {
        likes: 1,
      },
    };
  }
  else {
    updateDoc = {
      $set : {
        title : request.body.updateData.title
      }
    } 
  }
      console.log("updated doc --------------------------------------------------------------------",updateDoc, request.body)
      Blog.findByIdAndUpdate(id, updateDoc )
    .then((res) => {
      console.log("res---", res)
      response.status(200).send(res);
    })
    .catch((err) => {
      console.error("unable to update ", id, err.message);
      response.status(400).send(err.message);
    });
});

module.exports = blogRouter;
