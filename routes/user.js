const express = require("express");
const authenticateToken = require("../middlewares/authenticate");
const {handleRegister, 
       handleLogin,
       follow,
       unfollow } = require("../controllers/user");

const router = express.Router();

//to register
router.post("/register", handleRegister);

//to login
router.post("/login", handleLogin);

//to follow a user
router.post("/follow/:id", authenticateToken, follow);

//to unfollow a user
router.post("/unfollow/:id", authenticateToken, unfollow);


module.exports = router;
