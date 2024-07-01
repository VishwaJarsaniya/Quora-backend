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


const upvote = async(req,res) => {
    try{
        const answer = await Answer.findById(req.params.id);
        if(!answer){
            return res.json({error:"Answer not found"});
        }

        //remove downvote if it exists
        const downvoteIndex = answer.downvotes.indexOf(req.user._id);
        if(downvoteIndex !== -1){
            answer.downvotes.splice(downvoteIndex,1);
        }

        //add upvote if not already upvoted
        if(!answer.upvotes.includes(req.user._id)){
            answer.upvotes.push(req.user._id);
            await answer.save();
        }

        return res.json({msg:"Upvoting done"})
    }
    catch(error){
        res.status(500).json({error:"Error occurred", details: error.message});
    }
}


const downvote = async(req,res) => {
    try{
        const answer = await Answer.findById(req.params.id);
        if(!answer){
            return res.json({err:"Answer not found"});
        }

        //remove upvote if it exists
        const upvoteIndex = answer.upvotes.indexOf(req.user._id);
        if(upvoteIndex !== -1){
            answer.upvotes.splice(upvoteIndex,1);
        }

        //add downvote if not already downvoted
        if(!answer.downvotes.includes(req.user._id)){
            answer.downvotes.push(req.user._id);
            await answer.save();
        }
        
        return res.json({msg:"Downvoting done"});
    }
    catch(error){
        res.status(500).json({error:"Error occurred", details: error.message});
    }
    
}


module.exports = {
    handlePostAnswers,
    upvote,
    downvote,
}