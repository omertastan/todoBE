const express = require('express')
const { signup, loginUser } = require('../controllers/users')
const { check } = require('express-validator')

const router = express.Router()

router.post(
  '/api/v1/auth/login',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  loginUser
)

router.post(
  '/api/v1/auth/signup',
  [
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  signup
)

module.exports = router
