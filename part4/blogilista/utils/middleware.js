const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'ValidationError') {
    return res.status(400).send({ error: 'username must be unique and at least three characters long' })
  }
  if (error.name === 'TypeError') {
    return res.status(400).send({error: 'username and password have to be included'})
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    if (authorization.toLowerCase().startsWith('bearer')) {
      req.token = authorization.substring(7)
    }
  } 
  next()
}

const userExtractor = async (req, res, next) => {
  if (req.token) {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (decodedToken.id) {
      req.user = await User.findById(decodedToken.id)
    }
  }
  next()
}

module.exports = { errorHandler, tokenExtractor, userExtractor }