require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const authRoutes = require('./routes/auth')
const studentRoutes = require('./routes/student')

const app = express()
const port = Number(process.env.PORT || 5000)
if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 24) {
  console.error('Configuration error: set JWT_SECRET in backend/.env to a long random secret (at least 24 characters).')
  process.exit(1)
}
if (process.env.NODE_ENV === 'production' && !process.env.CLIENT_ORIGIN) {
  console.error('Configuration error: set CLIENT_ORIGIN (your website URL) in production.')
  process.exit(1)
}
const origins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173').split(',').map(value => value.trim())
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: origins }))
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false, message: { message: 'Too many attempts. Please try again in 15 minutes.' } })
app.use(express.json({ limit: '20kb' }))
app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'Bright Academy API' }))
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/student', studentRoutes)
app.use((err, req, res, next) => {
  console.error(err)
  if (res.headersSent) return next(err)
  res.status(500).json({ message: 'Server error. Please try again in a moment.' })
})

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/brightacademy')
  .then(() => app.listen(port, () => console.log(`Bright Academy API running at http://localhost:${port}`)))
  .catch(err => { console.error('Could not connect to MongoDB. Check MONGODB_URI in backend/.env.'); console.error(err.message); process.exit(1) })
