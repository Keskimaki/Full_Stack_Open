const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const variables = require('./test_variables')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  for (let user of variables.users) {
    let userObject = new User(user)
    await userObject.save()
  }
})

test('api returns list of users', async () => {
  const response = await api.get('/api/users')
  expect(response.body.length).toBe(2)
})

test('new user can be added', async () => {
  const newUser = { username: "newUser", name: "Testing", password: "superSecret"}
  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(3)
})

test('username and password need to have at least three characters', async () => {
  const newUser1 = { username: "ne", name: "Testing", password: "superSecret"}
  const newUser2 = { username: "newUser", name: "Testing", password: "su"}
  await api
    .post('/api/users')
    .send(newUser1)
    .expect(400)

  await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
  
  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(2)
})

test('username has to be unique', async () => {
  const newUser = { username: "root", name: "Testing", password: "superSecret"}
  await api
  .post('/api/users')
  .send(newUser)
  .expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(2)
})

test('password and username must exist', async () => {
  const newUser1 = { name: "Testing", password: "superSecret"}
  const newUser2 = { username: "root", name: "Testing"}
  await api
    .post('/api/users')
    .send(newUser1)
    .expect(400)

  await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)

  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(2)
})

afterAll(() => {
  mongoose.connection.close()
})