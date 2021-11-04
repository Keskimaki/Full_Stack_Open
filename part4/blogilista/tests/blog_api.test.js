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
  expect(response.body[0].id).toBeDefined()
})

test('new blog can be added with POST', async () => {
  await api
    .post('/api/blogs')
    .send(variables.newBlog[0])
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(7)
})

test('if no likes value then likes equals zero', async () => {
  const newBlog = { title: "Application testing", author: "Tester", url: "placeholder.com" }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  expect(response.body[6].likes).toBe(0)
})

test('new post has to include title and url', async () => {
  const newBlog = { url: "placeholder.com", likes: 1 }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
})

test('blog can be deleted', async () => {
  await api
    .delete('/api/blogs/5a422aa71b54a676234d17f8')
    .expect(204)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(5)
})

test('blog can be modified', async () => {
  const modifiedBlog = { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 99 }

  await api
    .put('/api/blogs/5a422aa71b54a676234d17f8')
    .send(modifiedBlog)
    .expect(204)
  
  const response = await api.get('/api/blogs')
  expect(response.body[1].likes).toBe(99)
})

afterAll(() => {
  mongoose.connection.close()
})
