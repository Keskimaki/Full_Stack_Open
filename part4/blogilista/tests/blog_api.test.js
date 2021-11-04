const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const variables = require('./test_variables')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of variables.blogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('returns correct amount of JSON blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
})

test('identifying field is called id', async () => {
  const response = await api.get('/api/blogs')
  /*const blogIds = response.body.map(blog => blog.id)
  let correct = null
  if (blogIds.some(id => id === undefined)) {
    correct = false
  } else {
    correct = true
  }
  expect(correct).toBe(true)*/
  expect(response.body[0].id).toBeDefined()
})

afterAll(() => {
  mongoose.connection.close()
})
