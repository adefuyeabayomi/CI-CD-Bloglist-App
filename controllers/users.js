let userRouter = require("express").Router();
let User = require("../models/user_model");
let bcryptjs = require("bcryptjs")
var salt = bcryptjs.genSaltSync(10);

// returns all users in the database
userRouter.get("/api/users",(request,response,next)=>{
    User.find({}).populate("blogs").then((data)=>{
        console.log("users in the database",data)
        response.status(200).json(data)
    }).catch(err=>{
        response.status(500).json({error: "unable to retrieve users from database" + err.message})
        next(err);
    })
})

// creates a new user in the database
userRouter.post("/api/users",(request,response,next)=>{
    if(request.body.username.length < 3 || request.body.password.length < 8){
        return response.status(400).send({error : "Username and password must be of length greater than 3 and 8 respectively"});
    }
    console.log("password", request.body.password)
    bcryptjs.hash(request.body.password,salt).then(cryptPass=>{
        let userObject = {
            username : request.body.username,
            password : cryptPass
        }
        let user = new User(userObject);
        user.save().then((res)=>{
            console.log("saved user",res)
            response.status(201).send(res);
        }).catch(err=> next(err))
    }).catch(err=> next(err))
})

// returns a the user with the corresponding id
userRouter.get("/api/users/:id",(request,response,next)=>{
    let id = request.params.id;
    User.find({_id : id}).then(res=>{
        response.status(200).send(res);
    }).catch(err=>next(err))
})

module.exports = userRouter

