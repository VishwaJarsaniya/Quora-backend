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
        ref:'Question',
    }],
});

const Question = new mongoose.model("Question", questionSchema);

module.exports = Question;