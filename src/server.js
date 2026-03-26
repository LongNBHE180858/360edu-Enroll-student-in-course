const express = require('express');
const enrollmentRoutes = require('./routes/enrollmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', enrollmentRoutes);

app.get('/', (req, res) => {
  res.json({
    name: '360edu UC-10 Demo',
    description: 'Node.js demo for Enroll Student in Course with fake data.',
    endpoints: {
      health: 'GET /api/health',
      students: 'GET /api/students',
      courses: 'GET /api/courses',
      classesByCourse: 'GET /api/courses/:courseId/classes',
      enrollments: 'GET /api/enrollments',
      previewEnrollment: 'POST /api/enrollments/preview',
      createEnrollment: 'POST /api/enrollments',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
