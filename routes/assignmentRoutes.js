// routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Create a new assignment
router.post('/assignments', assignmentController.createAssignment);

// Get assignments by course ID
router.get('/courses/:courseId/assignments', assignmentController.getAssignmentsByCourseId);

module.exports = router;
