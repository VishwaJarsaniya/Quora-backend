require('dotenv').config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req,res,next) => {
    const token = req.headers["authorization"];
    if(!token){
        return res.status(403).json({msg:"No token provided"})
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err,decoded)=>{
        if(err){
            return res.status(500).json({error:"Failed to authenticate token"})
        }
        req.user = {};
        req.user._id = decoded._id;
        next();
    })

}

module.exports = authenticateToken