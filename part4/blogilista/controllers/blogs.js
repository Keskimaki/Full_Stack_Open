const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find().populate('user', { username: 1, name: 1})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body
  if (!body.title || !body.url) {
    return res.status(400).end()
  } else if (!req.body.likes) {
    body.likes = 0
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: req.user._id
  })
  const result = await blog.save()
  req.user.blogs = req.user.blogs.concat(result._id)
  await User.findByIdAndUpdate(decodedToken.id, req.user)

  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid'} )
  }
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === req.user.id) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  }
  res.status(401).json({ error: 'wrong account'})
})

blogsRouter.put('/:id', async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body)
  res.status(204).end()
})

module.exports = blogsRouter
