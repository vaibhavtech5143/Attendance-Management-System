const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const performanceRoutes = require('./routes/performanceRoutes');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Set view engine and views directory
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files (if any)
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Routes
app.use('/api', authRoutes);
app.use('/api', studentRoutes);
app.use('/api', courseRoutes);
app.use('/api', assignmentRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', performanceRoutes);
app.get('/',(req,res)=>{
  res.send("Hello World")
})
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});