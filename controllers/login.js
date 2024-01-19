const loginRouter = require("express").Router()
const User = require("../models/user_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../utils/config")

loginRouter.post("/api/login/", (request,response,next)=>{
    const {username ,password} = request.body
    console.log("user name and password login 9",{username ,password})
    User.find({username}).then(async (user) =>{
        if(user[0] === null || user[0] === undefined){
            return response.status(401).json({error:"invalid username and password"})
        }
        else {
            let passwordCorrect = await bcryptjs.compare(password,user[0].password);
            if(passwordCorrect){
                let tokenObj = {
                    username : user[0].username,
                    id: user[0]._id
                }
                const token = jwt.sign(tokenObj, config.SECRET,{expiresIn : 60*60})
                console.log("de tokenized", jwt.verify(token,config.SECRET))
                response
                  .status(200)
                  .send({ token, username, id: user[0]._id})                      
            }
            else {
                return response.status(401).json({error:"invalid username and password"})
            }
        }
    })
})

module.exports = loginRouter;