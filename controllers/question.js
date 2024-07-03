const Question = require("../models/question");

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

const handleDeleteQuestion = async(req,res) => {
    try{
        const ques = await Question.findById(req.params.id);
        const deletedQues = await ques.deleteOne();
        res.json({msg:"Question deleted successfully"});
    }
    catch(error){
        res.status(500).json({error:"Error in deleting question"});
    }
};

const handleUpdateQuestion = async(req,res) => {
    try{
        const ques = await Question.findByIdAndUpdate(req.params.id, req.body);
        res.json({msg:"Question updated successfully"});
    }
    catch(error){
        res.status(500).json({error:"Error in updating question", details: error.message});
    }
};

const upvote = async(req,res) => {
    try{
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.json({error:"Question not found"});
        }
        
        //remove downvote if it exists
        const downvoteIndex = question.downvotes.indexOf(req.user._id);
        if(downvoteIndex !== -1){
            question.downvotes.splice(downvoteIndex,1);
        }

        //add upvote if not already upvoted
        if(!question.upvotes.includes(req.user._id)){
            question.upvotes.push(req.user._id);
            await question.save();
        }
        
        return res.json({msg:"Upvoting done"});
    }
    catch(error){
        res.status(500).json({error:"Error occurred", details: error.message});
    }
};

const downvote = async(req,res) => {
    try{
        const question = await Question.findById(req.params.id);
        if(!question){
            return res.json({error:"Question not found"});
        }

       //remove upvote if it exists
       const upvoteIndex = question.upvotes.indexOf(req.user._id);
       if(upvoteIndex !== -1){
           question.upvotes.splice(upvoteIndex,1);
       }

       //add downvote if not already downvoted
       if(!question.downvotes.includes(req.user._id)){
           question.downvotes.push(req.user._id);
           await question.save();
       }

        return res.json({msg:"Downvoting done"});
    }
    catch(error){
        res.status(500).json({error:"Error occurred", details: error.message});
    }
};


const uploadImages = async(req,res) => {
    try{
        const images = req.files.map(file => ({
            type: file.mimetype,
            data: file.buffer,
        }));
        const question = await Question.findById(req.params.id);
        question.images = images;
        await question.save();
        res.status(200).json({msg:"Images uploaded successfully"});
    }
    catch(error){
        res.status(500).json({error:"Error uploading images", details: error.message});
    }
};


module.exports = {
    handlePostQuestions,
    handleDisplayQuestions,
    handleDeleteQuestion,
    handleUpdateQuestion,
    upvote,
    downvote,
    uploadImages,
}