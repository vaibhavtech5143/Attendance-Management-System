// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken } = require('../middleware/authMiddleware');

// CRUD operations for students
router.get('/students', studentController.getAllStudents);
router.get('/students/create', studentController.createStudentForm);
router.get('/students/:uid', studentController.getStudentByUid);
router.post('/students', studentController.createStudent);
router.put('/students/:uid', studentController.updateStudentByUid);
router.delete('/students/:uid', studentController.deleteStudentByUid);


module.exports = router;
