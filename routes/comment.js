const express = require("express");
const authenticateToken = require("../middlewares/authenticate");
const {handleAddComment, handleGetComments, handleDeleteComment, handleUpdateComment} = require("../controllers/comment");

const router = express.Router();

router.post("/add", authenticateToken, handleAddComment);

router.get("/get", authenticateToken, handleGetComments);

router.delete("/delete/:id", authenticateToken, handleDeleteComment);

router.patch("/update/:id", authenticateToken, handleUpdateComment);


module.exports = router;