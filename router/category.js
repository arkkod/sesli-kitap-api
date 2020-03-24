const express = require("express");
const router = express.Router();
const Category = require("../model/Category");

router.get("/", (req, res) => {
    Category.find({}, (err, data) => {
        if(!err){
            res.json(data);
        }
    });
});

router.get("/detail/:id", (req, res) => {
    Category.findOne({_id: req.params.id}, (err, data) => {
        if(!err){
            res.json(data);
        }
    });
});

router.post("/add", (req, res) => {
    let new_category = new Category(req.body);
    new_category.save();
    res.json({
        success: true,
        message: "İşlem başarılı"
    });
});

module.exports = router;