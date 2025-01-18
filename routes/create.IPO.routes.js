const express = require('express')
const router = express.Router()
const createIPOControler = require('../controllers/createIPO.controler')
const auth = require('../middleware/auth')

router.post('/api/ipo', auth, createIPOControler);

module.exports = router;