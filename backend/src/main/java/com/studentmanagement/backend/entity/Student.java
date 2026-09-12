package com.studentmanagement.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Student Name is required.")
    private String name;

    @NotBlank(message = "Roll Number is required.")
    private String rollNo;

    @NotBlank(message = "Branch is required.")
    private String branch;

    @NotBlank(message = "Semester is required.")
    private String semester;

    @NotBlank(message = "Email is required.")
    @Email(message = "Invalid Email.")
    private String email;

    public Student() {
    }

    public Student(Long id, String name, String rollNo, String branch, String semester, String email) {
        this.id = id;
        this.name = name;
        this.rollNo = rollNo;
        this.branch = branch;
        this.semester = semester;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}