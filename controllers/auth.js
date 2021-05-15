const User = require('../model/user')
const Employee = require('../model/employee')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { v4: uuidv4 } = require('uuid')
const client = require('../util/redis')


exports.register = async (req, res, next) => {
  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email
  const password = req.body.password
  const orgName = req.body.orgName

  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      const err = new Error('Validation Failed')
      err.statusCode = 422
      err.data = errors.array()
      throw err
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      fname: fname,
      lname: lname,
      email: email,
      password: hashedPassword
    })
    const employee = await user.createEmployee({
      orgName: orgName
    })

    res.status(201).json({ user: user, employee: employee })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
  // Get the user data from the request body
  const email = req.body.email
  const password = req.body.password

  try {
    // Check if the user exists in db
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      const err = new Error('User not found!')
      err.statusCode = 401
      throw err
    }

    // Check if the password is valid
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      const err = new Error('Wrong Password')
      err.statusCode = 401
      throw err
    }

    // Generate uuids for access and refresh token
    const accessTokenId = uuidv4()
    const refreshTokenId = uuidv4()

    // Generate access token
    const accessToken = jwt.sign({
      userId: user.id,
      sessionId: accessTokenId
    },
      config.get('accessToken.secret'),
      { expiresIn: config.get('accessToken.expiry') })

    // Generate refresh token
    const refreshToken = jwt.sign({
      userId: user.id,
      sessionId: refreshTokenId
    },
      config.get('refreshToken.secret'),
      { expiresIn: config.get('refreshToken.expiry') })

    // Add access and refresh token to the cookie
    res.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hr
    })
    res.cookie('refreshToken', refreshToken, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    })

    // Add uuids of access and refresh token to the cache
    client.saddAsync('accessToken:sessions:' + user.id, accessTokenId)
    client.saddAsync('refreshToken:sessions:' + user.id, refreshTokenId)

    res.status(200).json({
      accessToken,
      refreshToken
    })
  } catch (err) {
    next(err)
  }
}

exports.search = async (req, res, next) => {
  const fname = req.body.fname
  const lname = req.body.lname
  const empid = req.body.empid

  try {
    const user = await User.findOne({
      where: { fname: fname, lname: lname },
      include: [{
        model: Employee,
        where: { empid: empid }
      }]
    })
    if (!user) {
      const err = new Error('User not found!')
      err.statusCode = 401
      throw err
    }
    res.status(200).json({ user: user })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.logout = (req, res, next) => {
  try {
    client.sremAsync('accessToken:sessions:' + req.userId, req.accessTokenId)
    client.sremAsync('refreshToken:sessions:' + req.userId, req.refreshTokenId)

    res.status(200).json({
      status: 'Logged Out Successfully'
    })
  } catch (err) {
    return next(err)
  }
}
