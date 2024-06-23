const mongoose = require('mongoose');
const attendanceSchema = require('./attendance'); // Assuming attendance schema is defined in 'attendance.js'

const resultSchema = new mongoose.Schema({
  semester: { type: Number, required: true, min: 1, max: 8 },
  scores: [{
    assignment: { type: String, ref: 'Assignment' },
    score: { type: Number }
  }],
  status: { type: String, enum: ['pass', 'fail', 'year-drop', 'supplementary', 'atkt'] }
});




const studentSchema = new mongoose.Schema({
  department: { type: String, enum: ['cs&e', 'it', 'comp,it'], required: true },
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  uid: { type: String, required: true, unique: true },
  coursesEnrolled: [{ type: String, required: true }],
  results: [resultSchema], // Assuming resultSchema is defined correctly
  attendance: [attendanceSchema] // Use attendanceSchema here, not Attendance
}, { _id: true });

module.exports = mongoose.model('Student', studentSchema);


// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({
//   date: { type: Date, required: true },
//   courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
//   studentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }],
//   present: { type: Boolean, default: false }
// });

// module.exports = attendanceSchema;
