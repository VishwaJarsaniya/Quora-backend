const express = require("express");
const authenticateToken = require("../middlewares/authenticate");
const {handlePostQuestions, handleDisplayQuestions, upvote, downvote} = require("../controllers/question");
const { route } = require("./user");

const router = express.Router();

//to post questions
router.post("/ask", authenticateToken, handlePostQuestions);

//to display or get questions
router.get("/display", authenticateToken, handleDisplayQuestions);

//to upvote
router.post("/upvote/:id", authenticateToken, upvote);

//to downvote
router.post("/downvote/:id", authenticateToken, downvote);



module.exports = router;