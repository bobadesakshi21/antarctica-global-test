const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Employee = sequelize.define('employee', {
  empid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  orgName: { type: Sequelize.STRING, allowNull: false }
})

module.exports = Employee
