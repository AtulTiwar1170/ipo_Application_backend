const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const authenticate = async (req, res, next) => {
    try {
        let token;
        // Check for token in cookies
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;