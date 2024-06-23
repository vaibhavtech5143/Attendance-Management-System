// routes/performanceRoutes.js
const express = require('express');
const router = express.Router();
const performanceController = require('../controllers/performanceController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get performance report for a student
router.get('/students/:studentId/performance', performanceController.getPerformanceReport);

module.exports = router;
