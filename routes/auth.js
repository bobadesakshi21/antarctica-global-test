const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const User = require('../model/user')
const Employee = require('../model/employee')
const isAuth = require('../middleware/auth')

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

router.post('/search/:pageNo', isAuth, authController.search)

router.get('/logout', isAuth, authController.logout)

module.exports = router
