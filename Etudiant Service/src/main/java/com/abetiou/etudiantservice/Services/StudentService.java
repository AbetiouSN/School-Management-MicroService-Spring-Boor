package com.abetiou.etudiantservice.Services;

import com.abetiou.etudiantservice.Configurations.AuthenticationServiceClient;
import com.abetiou.etudiantservice.DTO.AuthenticationResponse;
import com.abetiou.etudiantservice.DTO.RegisterRequest;
import com.abetiou.etudiantservice.DTO.User;
import com.abetiou.etudiantservice.Entities.Student;
import com.abetiou.etudiantservice.Repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final AuthenticationServiceClient authenticationServiceClient;

    public StudentService(StudentRepository studentRepository, AuthenticationServiceClient authenticationServiceClient) {
        this.studentRepository = studentRepository;
        this.authenticationServiceClient = authenticationServiceClient;
    }

    public Student createStudent(Student student, RegisterRequest registerRequest, String token) throws AccessDeniedException {
        // Vérifier si l'utilisateur authentifié est admin
        User authenticatedUser = authenticationServiceClient.getUserByToken(token);

        if (!authenticatedUser.getRole().equalsIgnoreCase("ADMIN")) {
            throw new AccessDeniedException("Only admins can create students");
        }

        // Appeler le service d'authentification pour créer l'utilisateur
        AuthenticationResponse response = authenticationServiceClient.createUser(registerRequest);

        if (response != null) {
            // Associer l'utilisateur créé au professeur
            student.setUserId(response.getUserId());

            // Sauvegarder le professeur dans la base de données
            return studentRepository.save(student);
        } else {
            throw new RuntimeException("User creation failed in authentication service");
        }
    }

    public List<Student> getStudentByNiveau(String niveau) {
        return studentRepository.findStudentByNiveau(niveau);
    }

}
