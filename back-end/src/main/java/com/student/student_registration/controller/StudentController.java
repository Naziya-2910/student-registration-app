package com.student.student_registration.controller;

import com.student.student_registration.model.Student;
import com.student.student_registration.repository.StudentRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @PostMapping("/students")
    public String registerStudent(@RequestBody Student student) {

        studentRepository.save(student);

        return "Student registered successfully: " + student.getName();
    }

    @GetMapping("/students")
    public java.util.List<Student> getStudents() {
        return studentRepository.findAll();
    }
}