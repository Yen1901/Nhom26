const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },  
    address: { type: String },
    phone: { type: String },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'Review'}],
    orders: [{type: mongoose.Schema.Types.ObjectId, ref: 'Order'}],
    role: { type: Boolean, default: false }  
}, { timestamps: true });

//bảo vệ password
userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;  
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
