// controllers/assignmentController.js
const Assignment = require('../models/assignment');

// Create a new assignment
exports.createAssignment = async (req, res) => {
  const { title, dueDate, courseId } = req.body;
  try {
    const newAssignment = new Assignment({ title, dueDate, course: courseId });
    await newAssignment.save();
    res.status(201).json({ message: 'Assignment created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get assignments by course ID
exports.getAssignmentsByCourseId = async (req, res) => {
  const { courseId } = req.params;
  try {
    const assignments = await Assignment.find({ course: courseId });
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
