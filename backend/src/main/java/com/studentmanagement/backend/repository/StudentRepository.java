package com.studentmanagement.backend.repository;

import com.studentmanagement.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s WHERE " +
           "(:search IS NULL OR LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR s.rollNo = :search OR CAST(s.id AS string) = :search) AND " +
           "(:branch IS NULL OR :branch = 'All' OR s.branch = :branch) AND " +
           "(:semester IS NULL OR :semester = 'All' OR s.semester = :semester)")
    Page<Student> findByFilters(
            @Param("search") String search,
            @Param("branch") String branch,
            @Param("semester") String semester,
            Pageable pageable
    );
}