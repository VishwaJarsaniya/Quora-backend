const express = require("express");
const {handlePostAnswers, upvote, downvote} = require("../controllers/answer");
const authenticateToken = require("../middlewares/authenticate");

const router = express.Router();

//to post answers
router.post("/answer", authenticateToken, handlePostAnswers);

//to upvote
router.post("/upvote/:id", authenticateToken, upvote);

//to downvote
router.post("/downvote/:id", authenticateToken, downvote);


module.exports = router;