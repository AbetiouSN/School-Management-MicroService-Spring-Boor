package com.abetiou.etudiantservice.Controllers;

import com.abetiou.etudiantservice.DTO.StudentCreationRequest;
import com.abetiou.etudiantservice.Entities.Student;

import com.abetiou.etudiantservice.Services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;
    StudentController(StudentService studentService) {
        this.studentService = studentService;
    }
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody StudentCreationRequest request) {

        Student createdStudent = studentService.createStudent(request.getStudent(), request.getRegisterRequest());
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }
}
