package com.abetiou.etudiantservice.Controllers;

import com.abetiou.etudiantservice.DTO.StudentCreationRequest;
import com.abetiou.etudiantservice.Entities.Student;
import com.abetiou.etudiantservice.Services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<?> createStudent(
            @RequestBody StudentCreationRequest request,
            @RequestHeader("Authorization") String token
    ) {
        try {
            // Appeler le service pour créer le professeur
            Student createdStudent = studentService.createStudent(request.getStudent(), request.getRegisterRequest(), token);
            return ResponseEntity.ok(createdStudent);

        } catch (AccessDeniedException ex) {
            // Gérer les erreurs d'accès non autorisé
            return ResponseEntity.status(403).body("Access denied: " + ex.getMessage());
        } catch (Exception ex) {
            // Gérer les autres exceptions
            return ResponseEntity.status(500).body("Error during student creation: " + ex.getMessage());
        }
    }
}
