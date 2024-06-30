const Question = require("../models/question");
const Answer = require("../models/answer");

const handlePostQuestions = async(req,res) => {
    const body = req.body;
    try{
    const ques = await Question.create({
        question: body.question,
        category: body.category,
        user: body.user,
    })
    console.log(ques);
    return res.status(200).json({msg:"Question posted successfully"})
    }
    catch(error){
        res.status(500).json({error:"Unable to ask question. Try again",error})
    }
};

const handleDisplayQuestions = async(req,res) => {
    try{
    const result = await Question.find();
    return res.status(200).json(result)
    }
    catch(error){
        return res.status(500).json({error:"Unable to fetch questions", details: error.message})
    }
};

module.exports = {
    handlePostQuestions,
    handleDisplayQuestions,
}