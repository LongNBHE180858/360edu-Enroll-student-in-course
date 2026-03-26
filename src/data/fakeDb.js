const students = [
  {
    id: 'ST001',
    fullName: 'Nguyen Minh Anh',
    level: 'Beginner',
    active: true,
    profileCompleted: true,
  },
  {
    id: 'ST002',
    fullName: 'Tran Gia Han',
    level: 'Intermediate',
    active: true,
    profileCompleted: true,
  },
  {
    id: 'ST003',
    fullName: 'Le Quang Huy',
    level: 'Advanced',
    active: false,
    profileCompleted: true,
  },
  {
    id: 'ST004',
    fullName: 'Pham Thu Trang',
    level: 'Intermediate',
    active: true,
    profileCompleted: false,
  },
];

const courses = [
  {
    id: 'COU001',
    name: 'English Foundation',
    requiredLevel: 'Beginner',
    status: 'OPEN',
  },
  {
    id: 'COU002',
    name: 'TOEIC 550+',
    requiredLevel: 'Intermediate',
    status: 'OPEN',
  },
  {
    id: 'COU003',
    name: 'IELTS 6.5+',
    requiredLevel: 'Advanced',
    status: 'OPEN',
  },
  {
    id: 'COU004',
    name: 'Business English',
    requiredLevel: 'Intermediate',
    status: 'CLOSED',
  },
];

const classes = [
  {
    id: 'CLS001',
    courseId: 'COU001',
    name: 'EF-01',
    schedule: 'Mon-Wed-Fri 18:00-19:30',
    capacity: 20,
    enrolledCount: 18,
    status: 'OPEN',
  },
  {
    id: 'CLS002',
    courseId: 'COU001',
    name: 'EF-02',
    schedule: 'Tue-Thu-Sat 18:00-19:30',
    capacity: 20,
    enrolledCount: 20,
    status: 'OPEN',
  },
  {
    id: 'CLS003',
    courseId: 'COU002',
    name: 'TOEIC-01',
    schedule: 'Mon-Wed 19:00-20:30',
    capacity: 15,
    enrolledCount: 12,
    status: 'OPEN',
  },
  {
    id: 'CLS004',
    courseId: 'COU003',
    name: 'IELTS-01',
    schedule: 'Sat-Sun 08:00-10:00',
    capacity: 10,
    enrolledCount: 10,
    status: 'OPEN',
  },
  {
    id: 'CLS005',
    courseId: 'COU004',
    name: 'BE-01',
    schedule: 'Tue-Thu 20:00-21:30',
    capacity: 12,
    enrolledCount: 5,
    status: 'CLOSED',
  },
];

const enrollments = [
  {
    id: 'ENR001',
    studentId: 'ST002',
    courseId: 'COU002',
    classId: 'CLS003',
    status: 'CONFIRMED',
    enrolledAt: '2026-03-01T08:00:00.000Z',
  },
];

module.exports = {
  students,
  courses,
  classes,
  enrollments,
};
