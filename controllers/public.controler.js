const IPOInfo = require('../models/ipo.model')

module.exports.publicControler = async (req, res, next) => {
    try {
        const ipoData = await IPOInfo.find({});
        res.status(201).json({
            success: true,
            data: ipoData
        });
    } catch (error) {
        next(error);
    }
}

