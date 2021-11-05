const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'ErrorNameHere') {
    return res.status(400).send({ error: 'errorDescriptionHere' })
  }

  next(error)
}

module.exports = { errorHandler }