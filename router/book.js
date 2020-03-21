const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("kitap listelemesi");
});

router.get("/detail", (req, res) => {
    res.send("kitap detayları");
});

module.exports = router;