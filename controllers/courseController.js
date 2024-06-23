const Course = require('../models/course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.render('course-view', { courses });
    // res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new course
exports.createCourseForm = async (req, res) => {
  res.render("create-course")
  
};
exports.createCourse = async (req, res) => {
  const { courseId, name, department } = req.body;
  try {
    // Create a new instance of Course model
    const newCourse = new Course({ courseId, name, department });

    // Save the new course to the database
    await newCourse.save();

    // Respond with a success message
 
    res.status(201).json({ message: 'Course created successfully', course: newCourse });
  } catch (error) {
    // Handle any errors that occur during course creation or saving
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;
  try {
    // Find the course in the database using courseId
    const course = await Course.findOne({ courseId });

    // If course is not found, return 404 Not Found
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // If course is found, return it with status 200 OK
    
    res.status(200).json(course);
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ message: error.message });
  }
};

// Update course by ID
exports.updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const updatedData = req.body;
  try {
    const updatedCourse = await Course.findOneAndUpdate({ courseId }, updatedData, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course by ID
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  try {
    const deletedCourse = await Course.findOneAndDelete({ courseId });
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
