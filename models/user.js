const mongoose = require("mongoose");
const validator = require("email-validator");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator: function(value){
                return validator.validate(value);
            },
            message: props => `${props.value} is not a valid email address`
        }
    },
    password:{
        type:String,
        required:true,
    },
    mobileno:{
        type:Number,
        required:true,
        unique:true,
    },
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:0,
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:0,
    }],
    profilePicURL:{
        type:String,
    },
});

const User = new mongoose.model("User",userSchema);

module.exports = User;