const Sequelize = require('sequelize')
const config = require('config')

const dbName = config.get('dbConfig.name')
const usename = config.get('dbConfig.usename')
const password = config.get('dbConfig.password')
const host = config.get('dbConfig.host')
const port = config.get('dbConfig.port')

const sequelize = new Sequelize(dbName, usename, password, {
  dialect: 'mysql',
  host: host,
  port: port
})

module.exports = sequelize
