const { RETURN_CODE } = require('../config/Enum');

module.exports = {
    buildReponse: (returnCode, message, payload) => {
        return {
            returnCode,
            message,
            ...payload
        };
    },

    isAllSuccessful: responses => {
        if (Array.isArray(responses)) {
            let isAllSuccessful = true;

            for (const res of responses) {
                if (res.returnCode !== RETURN_CODE.SUCCESS) {
                    isAllSuccessful = false;
                    break;
                }
            }

            return isAllSuccessful;
        }

        throw new Error('Responses is not an array');
    },

    buildInternalResponse: (returnCode, message, payload) => {
        return {
            returnCode,
            message,
            ...payload
        };
    }
};
