const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: String,
    description: String,
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }]
});

const Category = mongoose.model('Category', schema);
module.exports = Category;