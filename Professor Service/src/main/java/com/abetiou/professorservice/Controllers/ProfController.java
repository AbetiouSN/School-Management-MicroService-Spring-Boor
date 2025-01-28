package com.abetiou.professorservice.Controllers;

import com.abetiou.professorservice.DTO.ProfCreationRequest;
import com.abetiou.professorservice.Entities.Prof;
import com.abetiou.professorservice.Services.ProfService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;

@RestController
@RequestMapping("/prof")
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
}
