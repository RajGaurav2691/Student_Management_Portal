package com.studentmanagement.backend.service;

import com.studentmanagement.backend.entity.Student;
import com.studentmanagement.backend.exception.StudentNotFoundException;
import com.studentmanagement.backend.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Get All Students with Pagination and Filters
    public org.springframework.data.domain.Page<Student> getAllStudents(
            String search,
            String branch,
            String semester,
            org.springframework.data.domain.Pageable pageable) {

        if (search != null && search.trim().isEmpty()) {
            search = null;
        }

        return studentRepository.findByFilters(search, branch, semester, pageable);
    }

    // Get Student By ID
    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException(
                                "Student with ID " + id + " not found."
                        )
                );
    }

    // Add Student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Update Student
    public Student updateStudent(Long id, Student student) {

        // Check if student exists
        getStudentById(id);

        student.setId(id);

        return studentRepository.save(student);
    }

    // Delete Student
    public void deleteStudent(Long id) {

        // Check if student exists
        getStudentById(id);

        studentRepository.deleteById(id);
    }
}