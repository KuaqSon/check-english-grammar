const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        shopId: { type: mongoose.Types.ObjectId,
            ref: 'Shop' },
        orderInfo: {
            originalTotal: Number,
            paidTotal: Number,
            marketCode: {
                type: String,
                enum: [
                    'lazada',
                    'shopee'
                ]
            }, // 'lazada' || 'shopee'
            externalId: String,
            createdAt: {
                type: Date,
                default: Date.now
            },
            updatedAt: {
                type: Date
            },
            status: {
                type: String
            },
            isPackedLazadaOrder: {
                type: Boolean,
                default: null
            },
            // status: String //'pending' || 'readyToShip' || 'shipping' || 'success' || 'canceled'
            externalModel: Object
        },
        contact: {
            addressShipping: {
                name: String,
                address: String,
                phone: String,
                city: String,
                country: String
            },
            addressBilling: {
                name: String,
                address: String,
                phone: String,
                city: String,
                country: String
            }
        },

        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                },
                marketURL: String,
                productName: String,
                externalModel: Object,
                lazadaInvoiceNumber: String
            }
        ],

        logistic: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Logistic'
        },
        paymentMethod: String,

        updatedAt: {
            type: Date
        },
        createdAt: {
            type: Date
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', OrderSchema);

// const CartItemSchema = new mongoose.Schema({
//     product: {type: mongoose.Schema.ObjectId, ref: 'Product'},
//     quantity: Number,
//     shop: {type: mongoose.Schema.ObjectId, ref: 'Shop'},
//     status: {type: String,
//       default: 'Not processed',
//       enum: ['Not processed' , 'Processing', 'Shipped', 'Delivered', 'Cancelled']}
//   })
//   const CartItem = mongoose.model('CartItem', CartItemSchema)
//   const OrderSchema = new mongoose.Schema({
//     products: [CartItemSchema],
//     customer_name: {
//       type: String,
//       trim: true,
//       required: 'Name is required'
//     },
//     customer_email: {
//       type: String,
//       trim: true,
//       match: [/.+\@.+\..+/, 'Please fill a valid email address'],
//       required: 'Email is required'
//     },
//     delivery_address: {
//       street: {type: String, required: 'Street is required'},
//       city: {type: String, required: 'City is required'},
//       state: {type: String},
//       zipcode: {type: String, required: 'Zip Code is required'},
//       country: {type: String, required: 'Country is required'}
//     },
//     payment_id: {},
//     updated: Date,
//     created: {
//       type: Date,
//       default: Date.now
//     },
//     user: {type: mongoose.Schema.ObjectId, ref: 'User'}
//   })

//   const Order = mongoose.model('Order', OrderSchema)

//   export {Order, CartItem}
