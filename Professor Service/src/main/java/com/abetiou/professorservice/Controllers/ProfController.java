package com.abetiou.professorservice.Controllers;

import com.abetiou.professorservice.DTO.ProfCreationRequest;
import com.abetiou.professorservice.DTO.ProfUpdateRequest;
import com.abetiou.professorservice.Entities.Prof;
import com.abetiou.professorservice.Services.ProfService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/professor")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfController {

    private final ProfService profService;

    public ProfController(ProfService profService) {
        this.profService = profService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProfessor(
            @RequestBody ProfCreationRequest request,
            @RequestHeader("Authorization") String token
    ) {
        try {
            // Appeler le service pour créer le professeur
            Prof createdProf = profService.createProf(request.getProf(), request.getRegisterRequest(), token);
            return ResponseEntity.ok(createdProf);

        } catch (AccessDeniedException ex) {
            // Gérer les erreurs d'accès non autorisé
            return ResponseEntity.status(403).body("Access denied: " + ex.getMessage());
        } catch (Exception ex) {
            // Gérer les autres exceptions
            return ResponseEntity.status(500).body("Error during professor creation: " + ex.getMessage());
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Prof> updateStudent(
            @PathVariable Long id,
            @RequestBody ProfUpdateRequest request
    ) {
        Prof updatedProf = profService.updateStudentById(id, request.getProf(), request.getRegisterRequest());
        return ResponseEntity.ok(updatedProf);
    }



    // Endpoint pour récupérer la liste de tous les professeurs
    @GetMapping("/list")
    public List<Prof> getAllProfs() {
        return profService.getAllProfs();
    }
}
