const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const router = express.Router()

const initialCourses = [
  { id: 'academic-coaching', name: 'Academic Coaching', completedLessons: 0, totalLessons: 20 },
  { id: 'computer-digital-skills', name: 'Computer & Digital Skills', completedLessons: 0, totalLessons: 20 },
  { id: 'personality-development', name: 'Personality Development', completedLessons: 0, totalLessons: 20 },
]
function issueToken(student) {
  return jwt.sign({ studentId: student._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
function safeStudent(student) {
  return { id: student._id, name: student.name, email: student.email, courses: student.courses, createdAt: student.createdAt }
}

router.post('/register', async (req, res, next) => {
  try {
    const name = String(req.body.name || '').trim()
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    if (name.length < 2) return res.status(400).json({ message: 'Please enter your full name.' })
    if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ message: 'Please enter a valid email address.' })
    if (password.length < 8) return res.status(400).json({ message: 'Password must be at least 8 characters long.' })
    if (await Student.exists({ email })) return res.status(409).json({ message: 'An account with this email already exists. Please sign in.' })
    const passwordHash = await bcrypt.hash(password, 12)
    const student = await Student.create({ name, email, passwordHash, courses: initialCourses })
    res.status(201).json({ token: issueToken(student), student: safeStudent(student) })
  } catch (err) { if (err.code === 11000) return res.status(409).json({ message: 'An account with this email already exists.' }); next(err) }
})

router.post('/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase()
    const password = String(req.body.password || '')
    const student = await Student.findOne({ email }).select('+passwordHash')
    if (!student || !(await bcrypt.compare(password, student.passwordHash))) return res.status(401).json({ message: 'Email or password is incorrect.' })
    res.json({ token: issueToken(student), student: safeStudent(student) })
  } catch (err) { next(err) }
})
module.exports = router
