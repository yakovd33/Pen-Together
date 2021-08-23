const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    username: String,
    email: String,
    pass_hashed: String
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;