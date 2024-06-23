const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  courseId: { type: String, ref: 'Course', required: true },
  studentIds: [{ type: String, ref: 'Student', required: true }],
  present: { type: Boolean, default: false }
});

module.exports = attendanceSchema;
