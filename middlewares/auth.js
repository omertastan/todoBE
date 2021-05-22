import jwt from 'jsonwebtoken'
import config from 'config'

export const isAuthorized = (req, res, next) => {
  const token = req.header('x-auth-token')
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }
  try {
    const payload = jwt.verify(token, config.get('jwtSecret'))
    req.user = payload.user
    next()
  } catch (err) {
    console.log(err.message)
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
