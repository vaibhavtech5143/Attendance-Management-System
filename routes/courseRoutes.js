// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/authMiddleware');

// CRUD operations for courses
router.get('/courses', courseController.getAllCourses);
router.get('/create-course', (req, res) => {
    res.render('create-course');
  });
router.get('/courses', courseController.createCourseForm);
router.post('/courses', courseController.createCourse);
router.get('/courses/:courseId', courseController.getCourseById);
router.put('/courses/:courseId', courseController.updateCourse);
router.delete('/courses/:courseId', courseController.deleteCourse);

module.exports = router;
