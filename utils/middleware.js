let User = require("../models/user_model");
let jwt = require("jsonwebtoken");
let config = require("../utils/config")
let errorMiddleware = (error,request,response,next) => {
    if(error.name === "Validation Error"){
        return response.status(400).send({error:"please pass a valid value" + error.message});
    }
    if(error.name === "TokenExpiredError"){
        return response.status(401).send({error : "Token Expired"})
    }
    next(error);
}
let tokenExtractor = (request,response,next) => {
    request.token = request.header("Authorization");    
    next();
}
let userExtractor = async (request,response,next) => {
    let decodedToken
    try {
        decodedToken = jwt.verify(request.token, config.SECRET)
    }
    catch(err){
        return next(err);
    }
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Unauthorized' })
    }
    let user = await User.findOne({_id : decodedToken.id});
    request.user = user;
    next();
}
module.exports = {errorMiddleware,tokenExtractor,userExtractor};