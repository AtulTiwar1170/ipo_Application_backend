const IPOInfo = require('../models/ipo.model')

// module.exports.publicControler = async (req, res, next) => {
//     try {
//         const ipoData = await IPOInfo.find({});
//         res.status(201).json({
//             success: true,
//             data: ipoData
//         });
//     } catch (error) {
//         next(error);
//     }
// }
module.exports.getPublicIPO = async (req, res) => {
    try {
        // Your logic to get public IPO data
        const ipoData = await IPOInfo.find({});
        res.status(200).json({ message: 'Public IPO data', data: ipoData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

