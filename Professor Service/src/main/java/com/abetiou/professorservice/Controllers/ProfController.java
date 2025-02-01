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

    @GetMapping("/by-token")
    public ResponseEntity<ProfUpdateRequest> getStudentByToken(@RequestHeader("Authorization") String token) {
        ProfUpdateRequest response = profService.getStudentByToken(token);
        return ResponseEntity.ok(response);
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
    public ResponseEntity<Prof> updateProf(
            @PathVariable Long id,
            @RequestBody ProfUpdateRequest request
    ) {
        Prof updatedProf = profService.updateprofById(id, request.getProf(), request.getRegisterRequest());
        return ResponseEntity.ok(updatedProf);
    }



//    // Endpoint pour récupérer la liste de tous les professeurs
//    @GetMapping("/list")
//    public List<Prof> getAllProfs() {
//        return profService.getAllProfs();
//    }


    @GetMapping("/list")
    public ResponseEntity<List<ProfUpdateRequest>> getAllProfUpdateRequests() {
        List<ProfUpdateRequest> profUpdateRequests = profService.getAllProfUpdateRequests();
        return ResponseEntity.ok(profUpdateRequests);
    }

    //prof by id
    @GetMapping("/{id}")
    public ProfUpdateRequest getProfById(@PathVariable Long id) {
        return profService.findProfById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletProf(@PathVariable Long id){
        profService.deleteProf(id);
        return ResponseEntity.ok("pr  of deleted successfully");
    }

    @DeleteMapping("/{profId}/modules/{moduleId}")
    public String removeModule(@PathVariable Long profId, @PathVariable Long moduleId) {
        boolean removed = profService.removeModuleFromProf(profId, moduleId);
        return removed ? "Module removed successfully" : "Module not found for this professor";
    }



}
