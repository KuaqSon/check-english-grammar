// External Dependencies
const router = require('express').Router()
const axios = require('axios')
const {correct, Grammarly } = require('@stewartmcgown/grammarly-api');
const free = new Grammarly();

// Internal Dependencies
const DefaultRoutes = require('../../routes/DefaultRoutes')
const { buildReponse } = require('../../utils/ResponseBuilder')
const { RETURN_CODE, GRAMMAR_API } = require('../../config/Enum')

router.post(DefaultRoutes.GRAMMAR.CHECK, async (req, res) => {
  const { text, language } = req.body

  try {
    const resp = await axios.get(GRAMMAR_API.URL, {
      params: {
        api_key: process.env.API_KEY,
        language: language,
        text: text
      }
    })

    const results = await free.analyse(text);
    const { corrected } = await new Grammarly().analyse(text).then(correct);

    if (resp.data) {
      const { matches } = resp.data

      return res.json(
        buildReponse(RETURN_CODE.SUCCESS, 'successfully', {
          matches,
          results,
          corrected
        })
      )
    } else {
      return res.json(buildReponse(RETURN_CODE.FAILURE, 'failed'))
    }
  } catch (err) {
    return res.json(buildReponse(RETURN_CODE.FAILURE, err.toString()))
  }
})

module.exports = router
