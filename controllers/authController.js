// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

// Register a new user
exports.register = async (req, res) => {
    const { username, password, role, department } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role, department });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login an existing user
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id , name:user.username,role:user.role,department:user.department}, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Return the token and any additional user data if needed
        res.status(200).json({ token, user: { username: user.username, role: user.role, department: user.department } });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
