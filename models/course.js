const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, enum: ['cs&e', 'it', 'comp,it'], required: true },
    // Add more fields as needed
}); // Prevent courseId from being treated as _id

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;