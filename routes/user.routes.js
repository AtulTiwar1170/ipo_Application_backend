const express = require('express');
const router = express.Router()
const userControler = require('../controllers/user.controler')
const { check } = require('express-validator');


router.post('/api/users/register', [
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
], userControler.register);

// User login
router.post('/api/users/login',[
    check('username')
        .notEmpty()
        .withMessage('Username is required'),
    check('password')
        .notEmpty()
        .withMessage('Password is required'),
], userControler.login);


module.exports = router;