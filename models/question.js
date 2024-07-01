const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    answers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer',
    }],
    upvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:0,
    }],
    downvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:0,
    }],
});

const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;