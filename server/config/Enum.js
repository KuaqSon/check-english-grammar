module.exports = {
  ROLE: Object.freeze({
    ADMIN: 'ADMIN',
    USER: 'USER',
    VISITOR: 'VISITOR'
  }),

  RETURN_CODE: {
    SUCCESS: 1,
    FAILURE: 0
  },

  GRAMMAR_API: {
    URL: 'http://api.grammarbot.io/v2/check'
  }
}
