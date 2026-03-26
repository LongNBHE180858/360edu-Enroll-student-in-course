const express = require('express');
const service = require('../services/enrollmentService');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, message: 'UC-10 enrollment demo API is running.' });
});

router.get('/students', (req, res) => {
  res.json(service.getAllContext().students);
});

router.get('/courses', (req, res) => {
  res.json(service.getAllContext().courses);
});

router.get('/courses/:courseId/classes', (req, res) => {
  const { courseId } = req.params;
  res.json(service.listAvailableClasses(courseId));
});

router.get('/enrollments', (req, res) => {
  res.json(service.getAllContext().enrollments);
});

router.post('/enrollments/preview', (req, res) => {
  const { studentId, courseId, classId } = req.body;

  const student = service.findStudent(studentId);
  const course = service.findCourse(courseId);
  const classItem = service.findClass(classId);
  const eligibility = service.checkEligibility(student, course);
  const availability = service.checkClassAvailability(course, classItem);

  res.json({
    student,
    course,
    class: classItem,
    eligibility,
    availability,
  });
});

router.post('/enrollments', (req, res) => {
  const { studentId, courseId, classId } = req.body;

  if (!studentId || !courseId || !classId) {
    return res.status(400).json({
      success: false,
      code: 'MISSING_REQUIRED_FIELDS',
      message: 'studentId, courseId, and classId are required.',
    });
  }

  const result = service.createEnrollment({ studentId, courseId, classId });

  if (!result.success) {
    const status =
      result.code === 'STUDENT_NOT_ELIGIBLE'
        ? 422
        : result.code === 'CLASS_NOT_AVAILABLE'
          ? 409
          : result.code === 'DUPLICATE_ENROLLMENT'
            ? 409
            : 400;

    return res.status(status).json(result);
  }

  return res.status(201).json(result);
});

module.exports = router;
