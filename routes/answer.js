const express = require("express");
const {handlePostAnswers} = require("../controllers/answer");

const router = express.Router();

//to post answers
router.post("/answer", handlePostAnswers);


module.exports = router;