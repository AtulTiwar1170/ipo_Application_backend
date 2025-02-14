
const express = require('express');
const router = express.Router();
const publicControler = require('../controllers/public.controler');
const auth = require('../middleware/auth');

// Assuming publicControler has a method called getPublicIPO
router.get('/api/ipo/public', auth, publicControler.getPublicIPO);

module.exports = router;
