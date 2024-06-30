const Answer = require("../models/answer");

const handlePostAnswers = async(req,res) => {
    const body = req.body;
    try{
    const ans = await Answer.create({
        answer: body.answer,
        user: body.user,
        question: body.question,
    })
    console.log(ans)
    return res.status(200).json({msg:"Answer posted successfully"});
    } 
    catch(error){
        return res.status(500).json({error:"Unable to post answer to the question. Please try again"});
    }
};

module.exports = {
    handlePostAnswers,
}