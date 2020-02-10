const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');

const JWTConfig = require('../config/JWTConfig');

const encryptJWTPayload = payload => {
    return cryptoJS.AES.encrypt(
        JSON.stringify(payload),
        JWTConfig.PAYLOAD_ENCRYPTION.SECRET_KEY
    ).toString();
};

const decryptJWTPayload = payloadJson => {
    return cryptoJS.AES.decrypt(
        payloadJson,
        JWTConfig.PAYLOAD_ENCRYPTION.SECRET_KEY
    );
};

const generateToken = async payload => {
    const generatedToken = await jwt.sign(
        { data: encryptJWTPayload(payload) },
        JWTConfig.SECRET_KEY,
        {
            algorithm: JWTConfig.ALGORITHM,
            expiresIn: JWTConfig.EXPIRE_TIME
        }
    );

    return generatedToken;
};

const validateToken = token => {
    try {
        jwt.verify(token, JWTConfig.SECRET_KEY, {
            algorithms: JWTConfig.ALGORITHM
        });
    } catch (exc) {
        return false;
    }

    return true;
};

const getRoleFromToken = token => {
    try {
        const decoded = jwt.decode(token, { complete: true });

        return JSON.parse(
            decryptJWTPayload(decoded.payload.data).toString(cryptoJS.enc.Utf8)
        ).permission;
    } catch (exc) {
        return null;
    }
};

const getShopIdsFromToken = token => {
    try {
        const decoded = jwt.decode(token, { complete: true });

        return JSON.parse(
            decryptJWTPayload(decoded.payload.data).toString(cryptoJS.enc.Utf8)
        ).shopIds;
    } catch (exc) {
        return null;
    }
};

module.exports = {
    generateToken,
    validateToken,
    getRoleFromToken,
    getShopIdsFromToken,
    encryptJWTPayload,
    decryptJWTPayload
};
