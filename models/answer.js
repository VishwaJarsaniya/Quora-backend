const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    answer:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question',
    },
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

const Answer = new mongoose.model("Answer", answerSchema);

module.exports = Answer;