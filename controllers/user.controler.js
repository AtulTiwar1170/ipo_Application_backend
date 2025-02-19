const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator'); 



module.exports.login = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Invalid credentials');
        }
        // Generate JWT
        // const token = jwt.sign(
        //     { userId: user._id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '24h' }
        // );
        const token = generateToken(user);
        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(201).json({
            token: token,
            success: true,
            message: 'Login successful'
        });
    } catch (error) {
        next(error);
    }
},
module.exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password, firstName, lastName } = req.body;
        // Create a new user
        const newUser = new userModel({
            username,
            email,
            password,
            first_name: firstName,
            last_name: lastName,
        });
        // Save the user to the database
        await newUser.save();
        const token = generateToken(newUser);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });
        res.status(201).json({
            token: token,
            message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

