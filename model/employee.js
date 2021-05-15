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
  orgName: { type: Sequelize.STRING }
})

User.hasOne(Employee)
Employee.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })

module.exports = Employee
