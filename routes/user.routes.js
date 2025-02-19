const express = require('express');
const router = express.Router()
const userControler = require('../controllers/user.controler')
const { check } = require('express-validator');


router.post('/register', [
    (req, res, next) => {
        console.log('Received request body:', req.body);
        next();
    },
    check('username')
        .exists()
        .withMessage('Username field must exist')
        .notEmpty()
        .withMessage('Username is required')
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters'),
    
        check('email')
        .exists()
        .withMessage('Email field must exist')
        .notEmpty()
        .withMessage('Email is required')
        .trim()
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(), // Normalize email (e.g., lowercase, remove extra dots)
        check('password')
        .exists()
        .withMessage('Password field must exist')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    
        check('firstName')
        .exists()
        .withMessage('firstName field must exist')
        .notEmpty()
        .withMessage('First name is required')
        .trim(),
        check('lastName')
        .exists()
        .withMessage('lastName field must exist')
        .notEmpty()
        .withMessage('Last name is required')
        .trim(),
], userControler.register);

// User login
router.post('/login',[
    (req, res, next) => {
        console.log('Received request body:', req.body);
        next();
    },
    check('username')
        .exists()
        .withMessage('Username field must exist')
        .notEmpty()
        .withMessage('Username is required')
        .trim(),
    
    check('password')
        .exists()
        .withMessage('Password field must exist')
        .notEmpty()
        .withMessage('Password is required'),
], userControler.login);


module.exports = router;