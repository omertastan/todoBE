const { validationResult } = require('express-validator/')
const bcyrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

const loginUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Wrong email-password pair' }] })
    }

    const doMatch = await bcyrpt.compare(password, user.password)
    if (!doMatch) {
      return res
        .status(400)
        .json({ errors: [{ message: 'Invalid credentials' }] })
    }

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw new err()
        res.status(200).send({ token })
      }
    )
  } catch (err) {
    console.log(err.message)
    res.status(500).send('Server Error')
  }
}

const signup = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const { email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ message: 'User already exists' }] })
    }

    user = new User({ email, password })
    const salt = await bcyrpt.genSalt(10)
    user.password = await bcyrpt.hash(password, salt)
    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw new err()
        res.json({ token })
      }
    )
  } catch (err) {
    console.log(err.message)
    res.status(500).send('server error')
  }
}

exports.signup = signup
exports.loginUser = loginUser
