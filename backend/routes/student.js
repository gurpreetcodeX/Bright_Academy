const express = require('express')
const Student = require('../models/Student')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/me', auth, async (req, res, next) => {
  try {
    const student = await Student.findById(req.studentId)
    if (!student) return res.status(404).json({ message: 'Student account not found.' })
    res.json({ student: { id: student._id, name: student.name, email: student.email, courses: student.courses, createdAt: student.createdAt } })
  } catch (err) { next(err) }
})

router.post('/courses/:courseId/complete-lesson', auth, async (req, res, next) => {
  try {
    const student = await Student.findById(req.studentId)
    if (!student) return res.status(404).json({ message: 'Student account not found.' })
    const course = student.courses.find(item => item.id === req.params.courseId)
    if (!course) return res.status(404).json({ message: 'This course is not in your learning plan.' })
    if (course.completedLessons < course.totalLessons) course.completedLessons += 1
    await student.save()
    res.json({ student: { id: student._id, name: student.name, email: student.email, courses: student.courses, createdAt: student.createdAt } })
  } catch (err) { next(err) }
})
module.exports = router
