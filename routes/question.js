const express = require("express");
const authenticateToken = require("../middlewares/authenticate");
const {handlePostQuestions, handleDisplayQuestions, upvote, downvote, uploadImages, handleDeleteQuestion, handleUpdateQuestion} = require("../controllers/question");
const upload = require("../middlewares/multer");
const { route } = require("./user");

const router = express.Router();

//to post questions
router.post("/ask", authenticateToken, handlePostQuestions);

//to display or get questions
router.get("/display", authenticateToken, handleDisplayQuestions);

//to delete a question
router.delete("/deleteQuestion/:id", authenticateToken, handleDeleteQuestion);

//to update a question
router.patch("/updateQuestion/:id", authenticateToken, handleUpdateQuestion);

//to upvote
router.post("/upvote/:id", authenticateToken, upvote);

//to downvote
router.post("/downvote/:id", authenticateToken, downvote);

//to upload question images
router.post("/uploadImages/:id", authenticateToken, upload.array('images', 10), uploadImages);


module.exports = router;