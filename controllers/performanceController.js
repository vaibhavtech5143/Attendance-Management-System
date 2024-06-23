const Student = require('../models/student');
const Assignment = require('../models/assignment');
const User = require('../models/user');

// Function to calculate attendance percentage
const calculateAttendancePercentage = (attendanceRecords) => {
  if (!attendanceRecords || attendanceRecords.length === 0) return 0;

  const totalRecords = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(record => record.present).length;
  return (presentCount / totalRecords) * 100;
};

// Function to calculate average score
const calculateAverageScore = (scores) => {
  if (!scores || scores.length === 0) return 0;

  const totalScores = scores.map(score => score.score);
  const sumScores = totalScores.reduce((acc, curr) => acc + curr, 0);
  return sumScores / totalScores.length;
};

// Get performance report for a student
exports.getPerformanceReport = async (req, res) => {
  const { studentId } = req.params;

  try {
    // Fetch student details
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Fetch attendance records for the student
    const attendanceRecords = student.attendance;
    const attendancePercentage = calculateAttendancePercentage(attendanceRecords);

    // Fetch assignments related to the student
    const assignments = await Assignment.find({ courseId: { $in: student.coursesEnrolled } });

    // Fetch results for the student
    const results = student.results;

    // Calculate average score
    const averageScore = calculateAverageScore(results);

    // Fetch user details (for department and role)
    const user = await User.findOne({ username: student.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found for the student' });
    }

    // Construct performance report
    const performanceReport = {
      studentId: student._id,
      name: student.name,
      department: student.department,
      attendancePercentage,
      averageScore,
      role: user.role,
      // Add more fields as needed
    };

    res.status(200).json(performanceReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
