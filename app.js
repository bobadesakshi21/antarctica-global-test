const express = require('express')

const app = express()

const sequelize = require('./util/database')
sequelize.sync()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server is up and running')
    })
  })
  .catch(err => console.log('ERR:', err))
