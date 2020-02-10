// External Dependencies
const router = require('express').Router()

// Internal Dependencies
const DefaultRoutes = require('../../routes/DefaultRoutes')
const UserAccountCore = require('../../core/UserAccountCore')
const { buildReponse } = require('../../utils/ResponseBuilder')
const { RETURN_CODE } = require('../../config/Enum')
const { ROLE } = require('../../config/Enum')

// 2.1. Login
router.post(DefaultRoutes.USER_ACCOUNT.LOGIN, (req, res) => {
  const accountName = req.body.accountName
  const password = req.body.password

  if (!accountName || !password) {
    return res.json(
      buildReponse(
        RETURN_CODE.FAILURE,
        `${(!accountName && 'accountName') ||
          (!password && 'password')} is missing`
      )
    )
  }

  if (typeof accountName !== 'string' || typeof password !== 'string') {
    return res.json(
      buildReponse(RETURN_CODE.FAILURE, `input data type is invalid`)
    )
  }

  UserAccountCore.login({
    accountName,
    password
  })
    .then(loginInfo => {
      return res.json(
        buildReponse(RETURN_CODE.SUCCESS, 'login successfully', loginInfo)
      )
    })
    .catch(err => {
      return res.json(buildReponse(RETURN_CODE.FAILURE, err.message))
    })
})

// 2.2. Register
router.post(DefaultRoutes.USER_ACCOUNT.REGISTER, (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const phone = req.body.phone
  const email = req.body.email
  const fullname = req.body.fullname
  const permission = req.body.permission

  if (!username || !password || !phone || !email) {
    return res.json(
      buildReponse(
        RETURN_CODE.FAILURE,
        `${(!username && 'username') ||
          (!password && 'password') ||
          (!phone && 'phone') ||
          (!email && 'email')}` + ' is missing'
      )
    )
  }

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof phone !== 'string' || isNaN(Number(phone)) ||
    typeof email !== 'string' ||
    (fullname && typeof fullname !== 'string') ||
    (permission && (typeof permission !== 'string' || !ROLE[permission]))
  ) {
    return res.json(
      buildReponse(RETURN_CODE.FAILURE, `input data type is invalid`)
    )
  }

  UserAccountCore.register({
    username,
    password,
    phone,
    email,
    fullname,
    permission: permission || ROLE.USER
  })
    .then(createdUser => {
      return res.json(
        buildReponse(RETURN_CODE.SUCCESS, 'Register successfully', {
          username: createdUser.username
        })
      )
    })
    .catch(err => {
      if (err.name === 'MongoError') {
        return res.json(
          buildReponse(
            RETURN_CODE.FAILURE,
            err.errmsg.substring(
              err.errmsg.indexOf('index: ') + 7,
              err.errmsg.lastIndexOf('_')
            ) + ' is existing'
          )
        )
      }

      return res.json(buildReponse(RETURN_CODE.FAILURE, err.message))
    })
})

// 2.3. Reset password
router.post(DefaultRoutes.USER_ACCOUNT.RESET_PASSWORD, (req, res) => {
  const accountName = req.body.accountName

  if (!accountName) {
    return res.json(
      buildReponse(
        RETURN_CODE.FAILURE,
        `${!accountName && 'accountname'}` + ' is missing'
      )
    )
  }

  if (typeof accountName !== 'string') {
    return res.json(
      buildReponse(RETURN_CODE.FAILURE, `input data type is invalid`)
    )
  }

  UserAccountCore.resetPassword({
    accountName
  })
    .then(isReseted => {
      if (isReseted) {
        return res.json(
          buildReponse(
            RETURN_CODE.SUCCESS,
            'A reset email has been sent to your email'
          )
        )
      }

      return res.json(
        buildReponse(RETURN_CODE.FAILURE, 'Can not reset your account')
      )
    })
    .catch(err => {
      return res.json(buildReponse(RETURN_CODE.FAILURE, err.message))
    })
})

module.exports = router
