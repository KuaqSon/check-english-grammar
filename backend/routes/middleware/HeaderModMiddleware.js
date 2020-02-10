const { RESPONSE_HEADER } = require('../../config/BaseHeader');

module.exports = (req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');

    Object.keys(RESPONSE_HEADER).forEach(headerName => {
        res.setHeader(headerName, RESPONSE_HEADER[headerName]);
    });

    next();
};
