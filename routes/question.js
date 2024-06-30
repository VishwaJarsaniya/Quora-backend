const express = require("express");
const {handlePostQuestions, handleDisplayQuestions} = require("../controllers/question");
const { route } = require("./user");

const router = express.Router();

//to post questions
router.post("/ask", handlePostQuestions);

//to display or get questions
router.get("/display", handleDisplayQuestions);


module.exports = router;