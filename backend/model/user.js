const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
    
});

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
        userId:this._id,
        email:this.email,
        },"secretkey",{
            expiresIn:"10d"
        })
    } catch (error) {
        
    }
}

const user = mongoose.model("User",userSchema);
module.exports = user;

