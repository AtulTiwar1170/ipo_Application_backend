const express = require('express');
const router = express.Router()
const userControler = require('../controllers/user.controler')


// User registration
const userValidationRules = () => [
    check('username')
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters'),
    check('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(), // Normalize email (e.g., lowercase, remove extra dots)
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    check('firstName')
        .notEmpty()
        .withMessage('First name is required'),
    check('lastName')
        .notEmpty()
        .withMessage('Last name is required'),
];
router.post('/api/users/register', userValidationRules(), userControler.register);

// User login
const loginValidationRules = () => [
    check('username')
        .notEmpty()
        .withMessage('Username is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required'),
];
router.post('/api/users/login',loginValidationRules(), userControler.login);
module.exports = router;