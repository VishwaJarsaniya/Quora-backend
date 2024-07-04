require('dotenv').config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailLog, mailReg } = require('./nodemailer');
const cloudinary = require("cloudinary").v2;
const { application } = require('express');
const saltRounds = 10;

const handleRegister = async(req,res) => {
    const body = req.body;
    if(
        !body ||
        !body.username ||
        !body.email ||
        !body.password ||
        !body.mobileno
    ) {
        return res.status(400).json({msg:"All fields are required"})
    };

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(body.password,salt);

    const result = await User.create({
        username: body.username,
        email: body.email,
        password: hashedPassword,
        mobileno: body.mobileno,
    });
    mailReg();
    return res.status(201).json({msg:"registered successfully", id: result._id})
};

const handleLogin = async(req,res) => {
    const body = req.body;
    if(!body ||
        !body.email ||
        !body.password
    ){
        return res.status(400).json({msg:"All fields are required"})
    };
    const email = body.email;
    const password = body.password;
    const user = await User.findOne({email:email});
    if(user){
        const validPassword = await bcrypt.compare(password, user.password);
        //if the passwords match
        if(validPassword){
            //generate a jwt
            const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET, {expiresIn:"2h"});
            res.json(token);
            mailLog();
        }
        else{
            res.json({error:"Incorrect password"})
        }
    } 
    else{
        return res.status(404).json({msg:"Check the details. User not found"});
    }
};

const follow = async(req,res) => {
    try{
        const followUser = await User.findById(req.params.id);
        const followingUser = await User.findById(req.user._id);
        if(!followUser || !followingUser){
            return res.json({error:"user not found"});
        }
        followUser.followers.push(req.user._id);
        followingUser.following.push(req.params.id);
        await followUser.save();
        await followingUser.save();
        return res.json({msg:"Followed"})
    }
    catch(error){
        return res.send(error)
    }
    
};

const unfollow = async(req,res) => {
    try{
        const followUser = await User.findById(req.params.id);
        const followingUser = await User.findById(req.user._id);
        if(!followUser || !followingUser){
            return res.json({error:"User not found"});
        }
        followUser.followers.pull(req.user._id);
        followingUser.following.pull(req.params.id);
        await followUser.save();
        await followingUser.save();
        return res.json({msg:"Unfollowed"});
    }
    catch(error){
        return res.send(error);
    }
};


cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.API_SECRET,
})

const uploadProfilePicture = async(req,res) => {
    try{
        // console.log(req.file.path);
        const result = await cloudinary.uploader.upload(req.file.path);
        const profilePicURL = result.secure_url;
    
        const user = await User.findById(req.user._id);
        user.profilePicURL = profilePicURL;
        await user.save();
    
        return res.json({msg:"Profile pic uploaded"});
    }
    catch(error){
        return res.status(500).json({error:"Failed to upload profile picture", details: error.message});
    }

}


module.exports = {
    handleLogin,
    handleRegister,
    follow,
    unfollow,
    uploadProfilePicture,
}