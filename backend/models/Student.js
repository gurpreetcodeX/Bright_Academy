const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  completedLessons: { type: Number, default: 0, min: 0 },
  totalLessons: { type: Number, default: 20, min: 1 },
}, { _id: false })

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  courses: { type: [courseSchema], default: [] },
}, { timestamps: true })

module.exports = mongoose.model('Student', studentSchema)
