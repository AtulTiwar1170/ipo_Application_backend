
const IPOInfo = require('../models/ipo.model')
module.exports.createIPO = async (req, res, next) => {
    try {
        if (!req.user.staff_status) {
            throw new Error('Unauthorized');
        }

        const ipoInfo = new IPOInfo(req.body);
        await ipoInfo.save();

        res.status(201).json({
            success: true,
            message: 'IPO information added successfully'
        });
    } catch (error) {
        next(error);
    }
}