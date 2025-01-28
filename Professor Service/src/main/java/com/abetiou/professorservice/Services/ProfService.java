package com.abetiou.professorservice.Services;

import com.abetiou.professorservice.Configuration.AuthenticationServiceClient;
import com.abetiou.professorservice.DTO.AuthenticationResponse;
import com.abetiou.professorservice.DTO.RegisterRequest;
import com.abetiou.professorservice.DTO.User;
import com.abetiou.professorservice.Entities.Prof;
import com.abetiou.professorservice.Repository.ProfRepository;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;

@Service
public class ProfService {

    private final ProfRepository profRepository;
    private final AuthenticationServiceClient authenticationServiceClient;

    public ProfService(ProfRepository profRepository, AuthenticationServiceClient authenticationServiceClient) {
        this.profRepository = profRepository;
        this.authenticationServiceClient = authenticationServiceClient;
    }

    public Prof createProf(Prof prof, RegisterRequest registerRequest, String token) throws AccessDeniedException {
        // Vérifier si l'utilisateur authentifié est admin
        User authenticatedUser = authenticationServiceClient.getUserByToken(token);

        if (!authenticatedUser.getRole().equalsIgnoreCase("ADMIN")) {
            throw new AccessDeniedException("Only admins can create professors");
        }

        // Appeler le service d'authentification pour créer l'utilisateur
        AuthenticationResponse response = authenticationServiceClient.createUser(registerRequest);

        if (response != null) {
            // Associer l'utilisateur créé au professeur
            prof.setUserId(response.getUserId());

            // Sauvegarder le professeur dans la base de données
            return profRepository.save(prof);
        } else {
            throw new RuntimeException("User creation failed in authentication service");
        }
    }
}
