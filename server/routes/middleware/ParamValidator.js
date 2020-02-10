const Ajv = require('ajv');
const mongoose = require('mongoose');

const AJV_VALIDATOR = new Ajv({
    verbose: true,
    useDefaults: true,
    allErrors: true
});

AJV_VALIDATOR.addKeyword('isObjectId', {
    validate (toValidate, data) {
        if (toValidate) {
            const { ObjectId } = mongoose.Types;

            let isValidObjectId = null;

            try {
                isValidObjectId = new ObjectId(data).toString() === data;
            } catch (exc) {
                throw new Error('ObjectId is invalid!');
            }

            if (!isValidObjectId) {
                throw new Error('ObjectId is invalid!');
            }
        }

        return true;
    }
});

module.exports = ajvSchema => (req, res, next) => {
    const requestBody = req.body;

    const validate = AJV_VALIDATOR.compile(ajvSchema);
    const requestBodyIsValid = validate(requestBody);

    if (!requestBodyIsValid) {
        throw new Error(validate.errors[0].message);
    }

    next();
};
