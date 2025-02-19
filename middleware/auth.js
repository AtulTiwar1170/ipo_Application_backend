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

        // If no token is found, return an error
        if (!token) {
            return res.status(401).json({ error: 'Authentication required' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user by ID
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;
        next();
    } catch (err) {
        // Handle token verification errors
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired' });
        }
        // Handle other errors
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authenticate;