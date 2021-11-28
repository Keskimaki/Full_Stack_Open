const express = require('express');
const { Todo } = require('../mongo')
const { getAsync, setAsync } = require('../redis')

const router = express.Router();

let added_todos = 0

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  added_todos = await getAsync('added_todos')
  added_todos = Number(added_todos) + 1
  await setAsync('added_todos', added_todos)

  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

router.get('/statistics', async (_, res) => {
  const added_todos = await getAsync('added_todos')
  res.json({ added_todos: Number(added_todos) })
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = await req.todo
  res.send(todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const text = await req.todo.text
  await Todo.findOneAndUpdate({ text }, { done: true })
  res.sendStatus(204);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
