const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ipoInfoSchema = new mongoose.Schema({
    company_logo_path: String,
    company_name: {
        type: String,
        required: true,
        unique: true
    },
    price_band: String,
    open: String,
    close: String,
    issue_size: String,
    issue_type: String,
    listing_date: {
        type: Date,
        // Consider using a Date type for better data handling
    },
    status: {
        type: Number,
        enum: [0, 1, 2] // Define status values (e.g., 0: Upcoming, 1: Listed, 2: Closed)
    },
    ipo_price: String,
    listing_price: String,
    listing_gain: String,
    cmp: String,
    current_return: String,
    rhp: String,
    drhp: String
});

// Apply uniqueValidator for company_name
ipoInfoSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

module.exports = mongoose.model('IpoInfo', ipoInfoSchema);