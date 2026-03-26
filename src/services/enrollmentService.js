const db = require('../data/fakeDb');

const LEVEL_RANK = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

function getAllContext() {
  return {
    students: db.students,
    courses: db.courses,
    classes: db.classes,
    enrollments: db.enrollments,
  };
}

function findStudent(studentId) {
  return db.students.find((item) => item.id === studentId);
}

function findCourse(courseId) {
  return db.courses.find((item) => item.id === courseId);
}

function findClass(classId) {
  return db.classes.find((item) => item.id === classId);
}

function listAvailableClasses(courseId) {
  return db.classes.filter((item) => item.courseId === courseId);
}

function checkEligibility(student, course) {
  if (!student) {
    return { eligible: false, reason: 'Student profile does not exist.' };
  }

  if (!student.active) {
    return { eligible: false, reason: 'Student is inactive.' };
  }

  if (!student.profileCompleted) {
    return { eligible: false, reason: 'Student profile is incomplete.' };
  }

  if (!course) {
    return { eligible: false, reason: 'Course does not exist.' };
  }

  if (course.status !== 'OPEN') {
    return { eligible: false, reason: 'Course is not open for enrollment.' };
  }

  if (LEVEL_RANK[student.level] < LEVEL_RANK[course.requiredLevel]) {
    return {
      eligible: false,
      reason: `Student level ${student.level} does not meet required level ${course.requiredLevel}.`,
    };
  }

  return { eligible: true, reason: null };
}

function checkClassAvailability(course, classItem) {
  if (!classItem) {
    return { available: false, reason: 'Class does not exist.' };
  }

  if (!course || classItem.courseId !== course.id) {
    return { available: false, reason: 'Class does not belong to the selected course.' };
  }

  if (classItem.status !== 'OPEN') {
    return { available: false, reason: 'Class is closed.' };
  }

  if (classItem.enrolledCount >= classItem.capacity) {
    return { available: false, reason: 'Class is full.' };
  }

  return { available: true, reason: null };
}

function findExistingEnrollment(studentId, courseId) {
  return db.enrollments.find(
    (item) => item.studentId === studentId && item.courseId === courseId && item.status !== 'CANCELLED'
  );
}

function createEnrollment({ studentId, courseId, classId }) {
  const student = findStudent(studentId);
  const course = findCourse(courseId);
  const classItem = findClass(classId);

  const eligibility = checkEligibility(student, course);
  if (!eligibility.eligible) {
    return {
      success: false,
      step: 'eligibility-check',
      code: 'STUDENT_NOT_ELIGIBLE',
      message: eligibility.reason,
    };
  }

  const existingEnrollment = findExistingEnrollment(studentId, courseId);
  if (existingEnrollment) {
    return {
      success: false,
      step: 'duplicate-enrollment-check',
      code: 'DUPLICATE_ENROLLMENT',
      message: 'Student is already enrolled in this course.',
      data: existingEnrollment,
    };
  }

  const classAvailability = checkClassAvailability(course, classItem);
  if (!classAvailability.available) {
    return {
      success: false,
      step: 'class-availability-check',
      code: 'CLASS_NOT_AVAILABLE',
      message: classAvailability.reason,
    };
  }

  const nextId = `ENR${String(db.enrollments.length + 1).padStart(3, '0')}`;
  const enrollment = {
    id: nextId,
    studentId,
    courseId,
    classId,
    status: 'CONFIRMED',
    enrolledAt: new Date().toISOString(),
  };

  db.enrollments.push(enrollment);
  classItem.enrolledCount += 1;

  return {
    success: true,
    step: 'completed',
    code: 'ENROLLMENT_CREATED',
    message: 'Student has been enrolled successfully.',
    data: {
      enrollment,
      student,
      course,
      class: classItem,
    },
  };
}

module.exports = {
  getAllContext,
  findStudent,
  findCourse,
  findClass,
  listAvailableClasses,
  checkEligibility,
  checkClassAvailability,
  createEnrollment,
};
