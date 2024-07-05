const Comment = require("../models/comment");

const handleAddComment = async(req,res) => {
    try{
        const {comment, question, answer} = req.body;
        const user = req.user._id;
        let newcomment;
        if(question){
            newcomment = new Comment({comment, user, question});
        }
        else if(answer){
            newcomment = new Comment({comment, user, answer});
        }
        else{
           res.json({msg:"Please mention the question or answer to add comment"});
        }
        await newcomment.save()
        return res.json({msg:"Comment added"});
    }
    catch(error){
        return res.json({error:"Error occurred", details:error.message});
    }
};

const handleGetComments = async(req,res) => {
    try{
        const comments = await Comment.find({}).populate('user');
        return res.json(comments);
    }
    catch(error){
        return res.status(500).json({error:"Error occurred in fetching comments", details: error.message});
    }
};

const handleDeleteComment = async(req,res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        await comment.deleteOne();
        return res.json({msg:"Comment deleted successfully"});
    }
    catch(error){
        return res.json({error:"Error in deleting comment", details: error.message});
    }
};

const handleUpdateComment = async(req,res) => {
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);
        return res.json({msg:"Comment updated"});
    }
    catch(error){
        return res.json({error:"Error in updating comment"});
    }
};


module.exports = {handleAddComment, handleGetComments, handleDeleteComment, handleUpdateComment};
