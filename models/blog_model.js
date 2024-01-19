const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
  })
  blogSchema.set("toJSON",{
    transform : function (doc,retObj){
      retObj.id = doc._id.toString();
      if(!retObj.likes){
        retObj.likes = 0;
      }
      delete retObj._id;
      delete retObj.__v;
    }
  })
let Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;
