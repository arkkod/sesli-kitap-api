const express = require("express");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require('body-parser')
require('dotenv').config()

app.use(express.static('public'))
app.use(bodyParser.json())

const bookRouter = require("./router/book");
const categoryRouter = require("./router/category");

app.use("/api/book", bookRouter);
app.use("/api/category", categoryRouter);

app.listen(3000, () => {
    mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    console.log("server ayaga kalti!");
});