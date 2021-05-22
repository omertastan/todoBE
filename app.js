const express = require('express')
const cors = require('cors')
const indexTodosRouter = require('./routes/index')
const addTodoRouter = require('./routes/new')
const showTodoRouter = require('./routes/show')
const updateTodoRouter = require('./routes/update')
const deleteTodoRouter = require('./routes/delete')
const usersRouter = require('./routes/users')

const { json } = require('body-parser')

const app = express()
app.use(json())
app.use(
  cors({
    credentials: true,
    origin: true,
  })
)
app.options('*', cors())
app.use(usersRouter)
app.use(indexTodosRouter)
app.use(showTodoRouter)
app.use(addTodoRouter)
app.use(updateTodoRouter)
app.use(deleteTodoRouter)
app.all('*', async (_, res) => {
  res.status(404).send({ errors: [{ message: 'Page Not Found' }] })
})

module.exports = app
