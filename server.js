const connectDB = require('./config/db')
const app = require('./app')

const PORT = process.env.PORT || 5000

const start = async () => {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`I am running on ${PORT}`)
  })
}

start()
