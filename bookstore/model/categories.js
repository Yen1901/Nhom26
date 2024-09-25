const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },  
    description: { type: String },    
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]                     
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;

