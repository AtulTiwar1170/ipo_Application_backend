const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const user = {
    login : async (req, res, next) => {
        try {
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
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
    
            // Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
    
            res.status(201),json({
                token: token,
                success: true,
                message: 'Login successful'
            });
        } catch (error) {
            next(error);
        }
    },
    register : async (req, res, next) => {
        try {
            const { username, email, password, firstName, lastName } = req.body;
    
            // Validate required fields
            if (!username || !email || !password) {
                throw new Error('Missing required fields');
            }
    
            const user = new userModel({
                username,
                email,
                password,
                firstName,
                lastName
            });
    
            await user.save();
            // Generate JWT
            const token = jwt.sign(
                { userId: user._id },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );
    
            // Set cookie
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 24 * 60 * 60 * 1000 // 24 hours
            });
    
            res.status(201).json({
                token: token,
                success: true,
                message: 'User registered successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = user;