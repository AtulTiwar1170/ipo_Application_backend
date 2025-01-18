
const express = require('express')
const router = express.Router();
const publicControler = require('../controllers/public.controler')
const auth = require('../middleware/auth')

router.get('/api/ipo/public', auth, publicControler);

module.exports = router;
