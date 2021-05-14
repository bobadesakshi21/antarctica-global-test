const Sequelize = require('sequelize')
const sequelize = require('../util/database')
const User = require('../model/user')

const Employee = sequelize.define('employee', {
  empid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  userid: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  orgName: { type: Sequelize.STRING }
})
module.exports = Employee
