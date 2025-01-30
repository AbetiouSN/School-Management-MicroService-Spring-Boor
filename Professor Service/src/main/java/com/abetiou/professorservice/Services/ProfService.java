package com.abetiou.professorservice.Services;

import com.abetiou.professorservice.Configuration.AuthenticationServiceClient;
import com.abetiou.professorservice.DTO.AuthenticationResponse;
import com.abetiou.professorservice.DTO.ProfUpdateRequest;
import com.abetiou.professorservice.DTO.RegisterRequest;
import com.abetiou.professorservice.DTO.User;
import com.abetiou.professorservice.Entities.Prof;
import com.abetiou.professorservice.Repository.ProfRepository;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Prof updateprofById(Long id, Prof student, User user) {
        // Récupération de l'ancien prof
        Optional<Prof> existingProfOptional = profRepository.findById(id);

        if (existingProfOptional.isEmpty()) {
            throw new RuntimeException("Professor with ID " + id + " not found");
        }

        Prof oldProf = existingProfOptional.get();

        // Mise à jour de l'information du professeur
        oldProf.setCin(student.getCin());

        // Mise à jour de l'utilisateur via le service d'authentification
        User updatedUser = null;
        try {
            updatedUser = authenticationServiceClient.updateUser(
                    oldProf.getUserId(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getEmail()
            );
        } catch (Exception e) {
            // Gestion des exceptions
            System.out.println("Error updating user in Authentication Service: " + e.getMessage());
            throw new RuntimeException("Failed to update user in Authentication Service");
        }

        if (updatedUser == null) {
            throw new RuntimeException("Failed to update user: No response from Authentication Service");
        }

        // Sauvegarde du professeur après mise à jour
        profRepository.save(oldProf);

        return oldProf;
    }



    public List<Prof> getAllProfs() {
        return profRepository.findAll();
    }

    public List<ProfUpdateRequest> getAllProfUpdateRequests() {
        // Récupérer la liste des professeurs
        List<Prof> profs = profRepository.findAll();

        // Mapper chaque professeur en ProfUpdateRequest
        return profs.stream()
                .map(prof -> {
                    User user = authenticationServiceClient.findUserById(prof.getUserId());
                    return new ProfUpdateRequest(prof, user);
                })
                .collect(Collectors.toList());
    }



    public ProfUpdateRequest findProfById(Long id) {
        // Récupération de l'ancien prof
        Optional<Prof> prof = profRepository.findProfById(id);
        if (prof.isPresent()) {
            User user = authenticationServiceClient.findUserById(prof.get().getUserId());
            return new ProfUpdateRequest(prof.get(), user);
        }
        return null;
    }



    //delete User by id
    public void deleteProf(Long id){
        Prof student = profRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (student != null){
            profRepository.delete(student);
            authenticationServiceClient.deleteUser(student.getUserId());

            System.out.println("User deleted successfully");
        }
    }


}
