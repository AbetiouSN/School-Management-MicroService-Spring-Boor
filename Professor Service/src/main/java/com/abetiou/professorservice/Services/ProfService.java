package com.abetiou.professorservice.Services;

import com.abetiou.professorservice.Configuration.AuthenticationServiceClient;
import com.abetiou.professorservice.DTO.AuthenticationResponse;
import com.abetiou.professorservice.DTO.RegisterRequest;
import com.abetiou.professorservice.Entities.Prof;
import com.abetiou.professorservice.Repository.ProfRepository;
import org.springframework.stereotype.Service;

@Service
public class ProfService {

    private final ProfRepository profRepository;
    private final AuthenticationServiceClient authenticationServiceClient;

    ProfService(ProfRepository profRepository, AuthenticationServiceClient authenticationServiceClient) {
        this.profRepository = profRepository;
        this.authenticationServiceClient = authenticationServiceClient;
    }
    public Prof createProd(Prof prof, RegisterRequest registerRequest) {
        if (prof == null) {
            throw new IllegalArgumentException("Prof cannot be null");
        }

        try {
            // Appel du service d'authentification pour créer l'utilisateur
            AuthenticationResponse response = authenticationServiceClient.createUser(registerRequest);

            // Vérifier si la création de l'utilisateur est réussie
            if (response != null) {
                prof.setUserId(response.getUserId());
                System.out.println("AuthenticationResponse userId: " + response.getUserId());

                // Sauvegarder l'étudiant dans la base de données
                Prof savedProf = profRepository.save(prof);
                System.out.println("Professor successfully saved: " + savedProf);
                return savedProf;
            } else {
                System.err.println("Error creating user in AuthService");
                throw new RuntimeException("User creation failed in AuthService");
            }
        } catch (Exception ex) {
            System.err.println("Error during professor creation: " + ex.getMessage());
            throw new RuntimeException("Professor creation failed", ex);
        }
    }

}
