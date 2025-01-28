package com.abetiou.professorservice.Controllers;

import com.abetiou.professorservice.DTO.ProfCreationRequest;
import com.abetiou.professorservice.DTO.RegisterRequest;
import com.abetiou.professorservice.Entities.Prof;
import com.abetiou.professorservice.Services.ProfService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profs")
public class ProfController {

    private final ProfService profService;
    ProfController(ProfService profService) {
        this.profService = profService;
    }

    @PostMapping("/create-prof")
    public ResponseEntity<Prof> createProfessor(@RequestBody ProfCreationRequest creationRequest) {
        Prof prof = creationRequest.getProf();  // Récupérer l'objet Prof depuis la requête
        RegisterRequest registerRequest = creationRequest.getRegisterRequest();  // Récupérer le RegisterRequest

        if (prof == null || registerRequest == null) {
            return ResponseEntity.badRequest().body(null);  // Gérer le cas où les données sont manquantes
        }

        Prof createdProf = profService.createProd(prof, registerRequest);  // Appeler le service
        return ResponseEntity.ok(createdProf);  // Retourner le professeur créé
    }

}
