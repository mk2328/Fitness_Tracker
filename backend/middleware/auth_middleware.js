const jwt = require("jsonwebtoken");
const User = require("../model/User");

const auth_middleware =async(req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(400).json({msg:"Access Denied!"});
    }
    const trim_token= token.replace("Bearer","").trim();
    const verified_tok = await jwt.verify(trim_token,"secretkey");
    try {
        const userData = await User.findOne({email:verified_tok.email});
        req.user= userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth_middleware;