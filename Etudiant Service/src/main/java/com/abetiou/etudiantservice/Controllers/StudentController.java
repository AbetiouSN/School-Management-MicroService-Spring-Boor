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
    public ResponseEntity<Student> createStudent(
            @RequestBody StudentCreationRequest request
    ) {
        try {
            // Appel du service pour créer un étudiant
            Student createdStudent = studentService.createStudent(request.getStudent(), request.getRegisterRequest());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
        } catch (RuntimeException ex) {
            // Gérer les erreurs de création
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
