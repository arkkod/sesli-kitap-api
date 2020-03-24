const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Category = require("../model/Category");

router.get("/", (req, res) => {
    Category.aggregate([
        {
            $lookup: {
                from: 'books',
                localField: 'books',
                foreignField: '_id',
                as: 'books'
            }
        },
        {
            $project: {
                "__v": false,
                "books.category": false,
                "books.__v": false
            }
        }
    ], (err, data) => {
        if(!err){
            res.json(data);
        }
    });
});

router.get("/detail/:id", (req, res) => {
    Category.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: 'books',
                localField: 'books',
                foreignField: '_id',
                as: 'books'
            }
        },
        {
            $project: {
                "__v": false,
                "books.category": false,
                "books.__v": false
            }
        }
    ], (err, data) => {
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