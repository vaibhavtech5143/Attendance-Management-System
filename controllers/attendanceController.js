const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const mongoose = require('mongoose');




  // Mark attendance for selected students
  router.post('/mark-attendance', async (req, res) => {
    const { date, courseId, studentUids, present } = req.body; // Changed studentIds to studentUids to reflect the use of uid
    console.log("Request body:", req.body); // Log the entire request body for debugging
  
    try {
      // Find students based on the provided studentUids (uid)
      const students = await Student.find({ uid: { $in: studentUids } });
  
      console.log("Found students:", students); // Log found students for debugging
  
      // Iterate over each student and update attendance
      await Promise.all(students.map(async (student) => {
        const newAttendance = {
          date,
          courseId,
          studentIds:studentUids,
          present: present === 'true' // Convert 'true' string to boolean true
        };
  
        console.log("New attendance:", newAttendance); // Log new attendance for debugging
        student.attendance.push(newAttendance);
  
        // Save the student document
        await student.save();
      }));
  
      // Send success response
      res.status(201).json({ message: 'Attendance marked successfully' });
    } catch (error) {
      // Handle errors
      console.error("Error marking attendance:", error);
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = router;
  