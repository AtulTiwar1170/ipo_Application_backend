const express = require('express');
const router = express.Router()
const userControler = require('../controllers/user.controler')


// User registration
router.post('/api/users/register', userControler.register);

// User login
router.post('/api/users/login', userControler.login);
module.exports = router;