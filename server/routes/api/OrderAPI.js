// External Dependencies
const router = require('express').Router()

// Internal Dependencies
const OrderCore = require('../../core/OrderCore')
const DefaultRoutes = require('../../routes/DefaultRoutes')
const { buildReponse } = require('../../utils/ResponseBuilder')
const { RETURN_CODE, MARKET_IDENTIFIER } = require('../../config/Enum')

router.post(DefaultRoutes.ORDER.GET_ALL, (req, res) => {
  const { limit, offset, shopId, eMarketCodes, orderStatus, keyword } = req.body

  if ((limit !== 0 && !limit) || (offset !== 0 && !limit) || !shopId) {
    return res.json(
      buildReponse(
        RETURN_CODE.FAILURE,
        `${(limit !== 0 && !limit && 'limit') ||
          (offset !== 0 && !limit && 'offset') ||
          (!shopId && 'shopId')}` + ' is missing'
      )
    )
  }
  if (
    typeof limit !== 'number' ||
    typeof offset !== 'number' ||
    typeof shopId !== 'string' ||
    (keyword && typeof keyword !== 'string') ||
    (orderStatus && typeof orderStatus !== 'string') ||
    (eMarketCodes && !Array.isArray(eMarketCodes))
  ) {
    return res.json(
      buildReponse(RETURN_CODE.FAILURE, `input data type is invalid`)
    )
  }

  if (eMarketCodes) {
    for (const eMarketCode of eMarketCodes) {
      if (
        typeof eMarketCode !== 'string' ||
        !MARKET_IDENTIFIER[eMarketCode.toUpperCase()]
      ) {
        return res.json(
          buildReponse(RETURN_CODE.FAILURE, `eMarketCodes data type is invalid`)
        )
      }
    }
  }

  OrderCore.getAllOrders({
    limit,
    offset,
    shopId,
    eMarketCodes,
    orderStatus,
    keyword
  })
    .then(returnedData => {
      if (returnedData) {
        return res.json(
          buildReponse(RETURN_CODE.SUCCESS, 'Get orders successfully', {
            totalItems: returnedData.totalItems,
            orders: returnedData.orders
          })
        )
      }

      return res.json(
        buildReponse(RETURN_CODE.FAILURE, "There's something wrong!")
      )
    })
    .catch(err => {
      if (err.kind === 'ObjectId' && err.name === 'CastError') {
        return res.json(
          buildReponse(RETURN_CODE.FAILURE, `${err.path} is invalid`)
        )
      }

      return res.json(buildReponse(RETURN_CODE.FAILURE, err.toString()))
    })
})

router.post(DefaultRoutes.ORDER.GET_ONE, (req, res) => {
  const orderId = req.body.orderId
  const shopId = req.body.shopId

  if (!orderId || !shopId) {
    return res.json(
      buildReponse(
        RETURN_CODE.FAILURE,
        `${(!orderId && 'orderId') || (!shopId && 'shopId')}` + ' is missing'
      )
    )
  }
  if (typeof orderId !== 'string' || typeof shopId !== 'string') {
    return res.json(
      buildReponse(RETURN_CODE.FAILURE, `input data type is invalid`)
    )
  }

  OrderCore.getOneOrder(orderId, shopId)
    .then(returnedData => {
      if (returnedData) {
        return res.json(
          buildReponse(RETURN_CODE.SUCCESS, 'Get order successfully', {
            order: returnedData.order
          })
        )
      }

      return res.json(
        buildReponse(RETURN_CODE.FAILURE, "There's something wrong!")
      )
    })
    .catch(err => {
      if (err.kind === 'ObjectId' && err.name === 'CastError') {
        return res.json(
          buildReponse(RETURN_CODE.FAILURE, `${err.path} is invalid`)
        )
      }

      return res.json(buildReponse(RETURN_CODE.FAILURE, err.toString()))
    })
})
module.exports = router
