// models/assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    // Add more fields as needed
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
