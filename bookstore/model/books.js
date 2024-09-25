const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },            
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },  
    description: { type: String },                      
    price: { type: Number, required: true },            
    stock: { type: Number, required: true },            
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
    publisher: { type: String },                        
    publishDate: { type: Date },                        
    imageUrl: { type: String },                                      
    rating: { type: Number, default: 0 },               
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    orderItems: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem'}]
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
