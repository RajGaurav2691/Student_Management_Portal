package com.studentmanagement.backend.controller;

import com.studentmanagement.backend.dto.ApiResponse;
import com.studentmanagement.backend.entity.Student;
import com.studentmanagement.backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://student-management-portal-gilt.vercel.app"
})
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // GET ALL STUDENTS
    @GetMapping
    public ResponseEntity<ApiResponse<org.springframework.data.domain.Page<Student>>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String branch,
            @RequestParam(required = false) String semester) {

        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);

        org.springframework.data.domain.Page<Student> studentsPage =
                studentService.getAllStudents(search, branch, semester, pageable);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Students fetched successfully",
                        studentsPage
                )
        );
    }

    // GET STUDENT BY ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(@PathVariable Long id) {

        Student student = studentService.getStudentById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Student fetched successfully",
                        student
                )
        );
    }

    // ADD STUDENT
//    @PostMapping
//    public ResponseEntity<ApiResponse<Student>> addStudent(
//            @Valid @RequestBody Student student) {
//
//        Student savedStudent = studentService.addStudent(student);
//
//        return new ResponseEntity<>(
//                new ApiResponse<>(
//                        true,
//                        "Student added successfully",
//                        savedStudent
//                ),
//                HttpStatus.CREATED
//        );
//    }

    @PostMapping
    public ResponseEntity<ApiResponse<Student>> addStudent(
            @Valid @RequestBody Student student) {

        System.out.println("========== ADD STUDENT ==========");
        System.out.println("ID       : " + student.getId());
        System.out.println("Roll No  : " + student.getRollNo());
        System.out.println("Name     : " + student.getName());
        System.out.println("Email    : " + student.getEmail());
        System.out.println("Branch   : " + student.getBranch());
        System.out.println("Semester : " + student.getSemester());
        System.out.println("================================");

        Student savedStudent = studentService.addStudent(student);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new ApiResponse<>(
                        true,
                        "Student added successfully",
                        savedStudent
                ));
    }

    // UPDATE STUDENT
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        Student updatedStudent = studentService.updateStudent(id, student);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Student updated successfully",
                        updatedStudent
                )
        );
    }

    // DELETE STUDENT
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStudent(@PathVariable Long id) {

        studentService.deleteStudent(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Student deleted successfully",
                        null
                )
        );
    }
}