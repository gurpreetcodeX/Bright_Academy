const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : ''
  if (!token) return res.status(401).json({ message: 'Please sign in to continue.' })
  try {
    req.studentId = jwt.verify(token, process.env.JWT_SECRET).studentId
    next()
  } catch {
    return res.status(401).json({ message: 'Your session expired. Please sign in again.' })
  }
}
