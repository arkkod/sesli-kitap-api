const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Book = require("../model/Book");
const Category = require("../model/Category");

router.get("/", (req, res) => {
    Book.aggregate([
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $project: {
                "__v": false,
                "category.__v": false,
                "category.books": false
            }
        }
    ], (err, data) => {
        if(!err){
            res.json(data);
        }
    });
});

router.get("/detail/:id", (req, res) => {
    Book.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'category',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $project: {
                "__v": false,
                "category.__v": false,
                "category.books": false
            }
        }
    ], (err, data) => {
        if(!err){
            res.json(data);
        }
    });
});

router.post("/add", (req, res) => {
    let new_book = new Book(req.body);
    new_book.save();
    new_book.category.forEach(category_id => {
        Category.findOne({_id: category_id}, (err, data) => {
            if(!err){
                data.books.push(new_book._id);
                data.save();
            }
        });
    });
    res.json({
        success: true,
        message: "İşlem başarılı"
    });
});

module.exports = router;