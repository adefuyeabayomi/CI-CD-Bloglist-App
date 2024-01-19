const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minLength : 3
    },
    password : {
        type : String,
        required : true,
        minLength : 8
    },
    blogs : {
        type : [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Blog'
            }
          ],
    }
})

userSchema.set("toJSON",{
    transform : function (doc,returnObject){
        returnObject.id = returnObject._id;
        delete returnObject._id;
        delete returnObject.__v;
    }
})
const User = mongoose.model("User",userSchema)

module.exports = User;