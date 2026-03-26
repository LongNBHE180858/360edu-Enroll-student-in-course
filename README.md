# 360edu - UC-10 Enroll Student in Course

Demo backend bằng **Node.js + Express** cho **UC-10: Enroll Student in Course**.

Project này được viết lại riêng cho UC-10, có:
- fake data sẵn
- luồng kiểm tra điều kiện đầy đủ
- API preview trước khi enroll
- API enroll hoàn chỉnh
- tài liệu mô tả use case trong `docs/uc10-spec.md`

---

## 1. Use case được hiện thực

**UC-10: Enroll Student in Course**

### Mục tiêu
Admission Staff chọn một student, chọn một course, kiểm tra điều kiện học, kiểm tra lớp còn chỗ hay không, rồi tạo enrollment record và gán student vào class.

### Luồng chính trong code
1. Chọn student.
2. Chọn course.
3. Hệ thống kiểm tra eligibility của student.
4. Hệ thống hiển thị class theo course.
5. Chọn class.
6. Hệ thống kiểm tra class availability.
7. Nếu hợp lệ thì tạo enrollment.
8. Cập nhật `enrolledCount` của class.
9. Trả về kết quả thành công.

### Các trường hợp lỗi đã xử lý
- thiếu `studentId`, `courseId`, `classId`
- student không tồn tại
- student inactive
- student profile chưa hoàn chỉnh
- student không đủ level
- course đóng đăng ký
- class không thuộc course đã chọn
- class đóng
- class đầy
- student đã enroll course đó rồi

---

## 2. Cấu trúc project

```text
360edu-Enroll-student-in-course/
├── docs/
│   └── uc10-spec.md
├── src/
│   ├── data/
│   │   └── fakeDb.js
│   ├── routes/
│   │   └── enrollmentRoutes.js
│   ├── services/
│   │   └── enrollmentService.js
│   └── server.js
├── package.json
└── README.md
```

---

## 3. Cài đặt và chạy

### Yêu cầu
- Node.js 18+
- npm 9+

### Cài dependency

```bash
npm install
```

### Chạy project

```bash
npm start
```

Server mặc định chạy tại:

```bash
http://localhost:3000
```

---

## 4. API endpoints

### 4.1 Health check

```http
GET /api/health
```

### 4.2 Lấy danh sách student

```http
GET /api/students
```

### 4.3 Lấy danh sách course

```http
GET /api/courses
```

### 4.4 Lấy class theo course

```http
GET /api/courses/:courseId/classes
```

Ví dụ:

```http
GET /api/courses/COU002/classes
```

### 4.5 Xem danh sách enrollment

```http
GET /api/enrollments
```

### 4.6 Preview kiểm tra trước khi enroll

```http
POST /api/enrollments/preview
Content-Type: application/json
```

Request body:

```json
{
  "studentId": "ST002",
  "courseId": "COU002",
  "classId": "CLS003"
}
```

### 4.7 Enroll student vào course

```http
POST /api/enrollments
Content-Type: application/json
```

Request body:

```json
{
  "studentId": "ST001",
  "courseId": "COU001",
  "classId": "CLS001"
}
```

---

## 5. Các case test nhanh

### Case 1: Enroll thành công
```json
{
  "studentId": "ST001",
  "courseId": "COU001",
  "classId": "CLS001"
}
```

### Case 2: Student không đủ điều kiện level
```json
{
  "studentId": "ST001",
  "courseId": "COU002",
  "classId": "CLS003"
}
```

### Case 3: Student inactive
```json
{
  "studentId": "ST003",
  "courseId": "COU003",
  "classId": "CLS004"
}
```

### Case 4: Student profile chưa hoàn chỉnh
```json
{
  "studentId": "ST004",
  "courseId": "COU002",
  "classId": "CLS003"
}
```

### Case 5: Class đầy
```json
{
  "studentId": "ST001",
  "courseId": "COU001",
  "classId": "CLS002"
}
```

### Case 6: Course đóng
```json
{
  "studentId": "ST002",
  "courseId": "COU004",
  "classId": "CLS005"
}
```

### Case 7: Duplicate enrollment
```json
{
  "studentId": "ST002",
  "courseId": "COU002",
  "classId": "CLS003"
}
```

---

## 6. Mapping với UC-10

| UC-10 step | Code implementation |
|---|---|
| Select a student | `studentId` gửi từ request body |
| Select a course | `courseId` gửi từ request body |
| Check student eligibility | `checkEligibility()` |
| Check class availability | `checkClassAvailability()` |
| Assign student to a class | `classId` gửi từ request body |
| Create enrollment | `createEnrollment()` |
| Confirm enrollment | JSON response success |

---

## 7. Ghi chú
- Dữ liệu đang là **fake data in-memory**.
- Restart server sẽ reset dữ liệu.
- Project này tập trung vào **business flow của UC-10**, chưa dùng database thật.
