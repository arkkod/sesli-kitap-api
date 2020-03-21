const express = require("express");
const app = express();

app.use(express.static('public'))

const bookRouter = require("./router/book");
const categoryRouter = require("./router/category");

app.use("/api/book", bookRouter);
app.use("/api/category", categoryRouter);

app.listen(3000, () => {
    console.log("server ayaga kalti!");
});