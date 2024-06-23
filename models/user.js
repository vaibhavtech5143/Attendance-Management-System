// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'faculty'], required: true },
    department: { type: String, enum: ['cs&e', 'it', 'comp,it'], required: true },
    // Add more fields as needed
});

// Hash the password before saving the user


const User = mongoose.model('User', userSchema);

module.exports = User;
