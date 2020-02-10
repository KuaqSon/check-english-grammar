module.exports = {
  BASE_URL: '/api/v1',

  USER_ACCOUNT: {
    ROOT: '/auth',

    LOGIN: '/login',
    REGISTER: '/register',
    RESET_PASSWORD: '/resetPassword'
  },

  GRAMMAR: {
    ROOT: '/grammar',
    CHECK: '/check'
  },

  ORDER: {
    ROOT: '/order',

    GET_ALL: '/all',
    GET_ONE: '/one',
    CREATE: '/create',
    UPDATE: '/update',
    INFO: '/info',
    REMOVE: '/remove'
  }
}
