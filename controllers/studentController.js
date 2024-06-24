const Student = require('../models/student');


// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.render("all-student.ejs",{students})
    // console.log((students));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Stydent form ssr

exports.createStudentForm = async (req, res) => {
  try {
   
    res.render("student-create.ejs")
    // console.log((students));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Create a new student
exports.createStudent = async (req, res) => {
  const { _id, department, name, rollNo, uid, coursesEnrolled } = req.body;
  try {
    const newStudent = new Student({ _id, department, name, rollNo, uid, coursesEnrolled });
    await newStudent.save();
    res.status(201).json({ message: 'Student created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get student by UID
exports.getStudentByUid = async (req, res) => {
  const { uid } = req.params;
  try {
    const student = await Student.findOne({ uid: uid });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update student by UID
exports.updateStudentByUid = async (req, res) => {
  const { uid } = req.params;
  const updatedData = req.body;
  try {
    const updatedStudent = await Student.findOneAndUpdate({ uid: uid }, updatedData, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete student by UID
exports.deleteStudentByUid = async (req, res) => {
  const { uid } = req.params;
  try {
    const deletedStudent = await Student.findOneAndDelete({ uid });
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
