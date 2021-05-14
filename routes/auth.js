const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const User = require('../model/user')
const Employee = require('../model/employee')

const authController = require('../controllers/auth')

router.post('/register',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email-address')
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } })
          .then(userDoc => {
            if (userDoc) {
              return Promise.reject('Email Address all ready exists')
            }
          })
      })
      .normalizeEmail(),
    body('password')
      .isLength({ min: 4 })
      .withMessage('Password is too short.')
  ], authController.register)

router.post('/login', authController.login)

router.get('/logout', authController.logout)

module.exports = router
