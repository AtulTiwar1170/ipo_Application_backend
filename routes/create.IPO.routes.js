const express = require('express')
const router = express.Router()
const createIPOControler = require('../controllers/createIPO.controler')
const auth = require('../middleware/auth')
const { body } = require('express-validator');

router.post('/api/ipo', auth,
    [
        body('company_logo_path').isString().optional(),
        body('company_name').isString().notEmpty().withMessage('Company name is required'),
        body('price_band').isString().optional(),
        body('open').isString().optional(),
        body('close').isString().optional(),
        body('issue_size').isString().optional(),
        body('issue_type').isString().optional(),
        body('listing_date').isISO8601().toDate().optional(),
        body('status').isInt({ min: 0, max: 2 }).optional(),
        body('ipo_price').isString().optional(),
        body('listing_price').isString().optional(),
        body('listing_gain').isString().optional(),
        body('cmp').isString().optional(),
        body('current_return').isString().optional(),
        body('rhp').isString().optional(),
        body('drhp').isString().optional()
    ], createIPOControler);

module.exports = router;