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

module.exports = { errorHandler }