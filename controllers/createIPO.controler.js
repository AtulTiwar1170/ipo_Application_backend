const { validationResult } = require('express-validator');
const IpoInfo = require('../models/ipo.model')

module.exports.createIPO = async (req, res) => {
    // Validate the request
    try
    {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create a new IPO info document
    const ipoInfo = new IpoInfo(req.body);

    // Save the document to the database
    ipoInfo.save()
        .then(() => res.status(201).json({ message: 'IPO information saved successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
    }

catch (error) {
        next(error);
    }
};