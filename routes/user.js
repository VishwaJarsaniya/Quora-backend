const express = require("express");
const authenticateToken = require("../middlewares/authenticate");
const {handleRegister, 
       handleLogin,
       follow,
       unfollow, 
       uploadProfilePicture} = require("../controllers/user");
const upload = require("../middlewares/multer");

const router = express.Router();

//to register
router.post("/register", handleRegister);

//to login
router.post("/login", handleLogin);

//to follow a user
router.post("/follow/:id", authenticateToken, follow);

//to unfollow a user
router.post("/unfollow/:id", authenticateToken, unfollow);

//to upload profile pic
router.post("/uploadProfilePicture", authenticateToken, upload.single('image'), uploadProfilePicture);


module.exports = router;
