const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const ephonesRouter = require('./routes/phone')
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')

dotenv.config()
connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/v1/ephones', ephonesRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/orders', orderRouter)

// set up for production

if (process.env.NODE_ENV === 'production') {
app.use(express.static('frontend/build'))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}
// errorMeddilware should be under router
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} 
            mode on port ${PORT}`.yellow.bold
  )
)
