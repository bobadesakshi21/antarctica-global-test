const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

app.use(bodyParser.json())
// Import Routes
const authRoute = require('./routes/auth')

// Routes Middleware
app.use('/user', authRoute)

// Error Handling
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const data = error.data
  const message = error.message
  res.status(statusCode).json({
    message: message,
    data: data
  })
})

const sequelize = require('./util/database')
sequelize.sync({ force: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is up and running')
    })
  })
  .catch(err => console.log('ERR:', err))
