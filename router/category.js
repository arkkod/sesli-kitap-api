const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("category listelemesi");
});

router.get("/detail", (req, res) => {
    res.send("category detayları");
});

module.exports = router;