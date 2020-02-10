// External Dependencies
const router = require('express').Router();

// Internal Dependencies
const DefaultRoutes = require('../routes/DefaultRoutes');
// const UserAccountAPI = require('./api/UserAccountAPI');
const GrammarAPI = require('./api/GrammarAPI');
// const OrderAPI = require('./api/OrderAPI');

// Middlewares

// APIs
// router.use(DefaultRoutes.USER_ACCOUNT.ROOT, UserAccountAPI);
router.use(DefaultRoutes.GRAMMAR.ROOT, GrammarAPI);
// router.use(DefaultRoutes.ORDER.ROOT, OrderAPI);

/* eslint-disable */

// const ParamValidator = require('./middleware/ParamValidator');

// const ajvSchema = {
//     // type: 'object',
//     // required: ['myName', 'age'],
//     // properties: {
//     //     myName: { isObjectId: true, type: 'string', default: 'hihihi' },
//     //     age: { type: 'integer' },
//     // },
// };

module.exports = router;
