const Order = require('../models/Order');
const Product = require('../models/Product');

const getAllOrders = async ({
    limit,
    offset,
    eMarketCodes,
    orderStatus,
    shopId
}) => {
    const queryObj = {
        shopId,
        isDeleted: false
    };

    if (eMarketCodes && eMarketCodes.length) {
        queryObj['orderInfo.marketCode'] = {
            $in: eMarketCodes
        };
    }

    if (orderStatus) {
        queryObj['orderInfo.status'] = orderStatus;
    }

    const totalItems = await Order.find(queryObj).countDocuments();

    const orders = await Order.find(queryObj)
        .limit(limit)
        .skip(offset)
        .sort({ 'orderInfo.createdAt': -1 });

    const modifiedOrders = [];

    orders.forEach(order => modifiedOrders.push({
        isPackedLazadaOrder: order.orderInfo.isPackedLazadaOrder,
        orderId: order._id,
        paymentMethod: order.paymentMethod,
        total: order.orderInfo.paidTotal,
        marketCode: order.orderInfo.marketCode,
        itemCount: order.products.length,
        shippingInfo: {
            ...order.contact.addressShipping
        },
        orderStatus: order.orderInfo.status
    })
    );

    return {
        orders: modifiedOrders,
        totalItems
    };
};

const getOneOrder = async (orderId, shopId) => {
    const foundOrder = await Order.findOne({
        _id: orderId,
        shopId,
        isDeleted: false
    });

    if (!foundOrder) {
        throw new Error('Order not found!');
    }

    const productIdsOfOrder = [];

    foundOrder.products.forEach(info => {
        if (info.productId) {
            productIdsOfOrder.push(info.productId);
        }
    });

    const foundProducts = await Product.find({
        _id: {
            $in: productIdsOfOrder
        }
    });

    for (let i = 0; i < foundOrder.products.length; i++) {
        const productId = foundOrder.products[i].productId;

        let product = null;

        for (const prod of foundProducts) {
            if (prod._id.toString() === productId) {
                product = prod;
            }
        }

        if (product) {
            foundOrder.products[i] = product;
        }
    }

    return {
        order: foundOrder
    };
};

module.exports = {
    getAllOrders,
    getOneOrder
};
