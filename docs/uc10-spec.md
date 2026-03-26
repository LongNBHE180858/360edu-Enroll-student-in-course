# UC-10: Enroll Student in Course

## Goal
Allow Admission Staff to enroll an existing student into a selected course and assign the student to a class.

## Preconditions
- Admission Staff is logged in.
- Student profile exists.
- Course exists.

## Main flow implemented in code
1. Staff selects a student.
2. Staff selects a course.
3. System checks student eligibility.
4. System shows classes for the selected course.
5. Staff selects a class.
6. System checks class availability.
7. System creates enrollment.
8. System updates class occupancy.
9. System returns success response.

## Alternative / exception flows implemented
- Missing required fields in request body.
- Student does not exist.
- Student inactive.
- Student profile incomplete.
- Student level lower than required course level.
- Course is closed.
- Class does not belong to selected course.
- Class is closed.
- Class is full.
- Duplicate enrollment in the same course.

## Fake data notes
The demo stores fake data in memory, so restarting the server resets all records.
