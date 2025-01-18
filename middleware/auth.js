
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')


const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error('Authentication required');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};


module.exports = authenticate;