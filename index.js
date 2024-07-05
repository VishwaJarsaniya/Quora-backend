require('dotenv').config();
const express = require("express");
const {connectMongoDb} = require("./config/connection");
const userRoute = require("./routes/user");
const questionRoute = require("./routes/question");
const answerRoute = require("./routes/answer");
const commentRoute = require("./routes/comment");

const app = express();

const PORT = process.env.port;
const url = process.env.mongodbURL;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

connectMongoDb(url);

app.use("/user", userRoute);
app.use("/question", questionRoute);
app.use("/", answerRoute);
app.use("/comment", commentRoute);

app.listen(PORT, ()=>{console.log(`Server started on PORT: ${PORT}`)})