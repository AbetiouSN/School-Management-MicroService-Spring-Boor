package com.abetiou.etudiantservice.Services;

import com.abetiou.etudiantservice.Configurations.AuthenticationServiceClient;
import com.abetiou.etudiantservice.DTO.AuthenticationResponse;
import com.abetiou.etudiantservice.DTO.RegisterRequest;
import com.abetiou.etudiantservice.Entities.Student;

import com.abetiou.etudiantservice.Repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final AuthenticationServiceClient authenticationServiceClient;

    StudentService(StudentRepository studentRepository, AuthenticationServiceClient authenticationServiceClient) {
        this.studentRepository = studentRepository;
        this.authenticationServiceClient = authenticationServiceClient;
    }

    public Student createStudent(Student student, RegisterRequest registerRequest) {
        try {
            // Appel du service d'authentification pour créer l'utilisateur
            AuthenticationResponse response = authenticationServiceClient.createUser(registerRequest);

            // Vérifier si la création de l'utilisateur est réussie
            if (response != null) {
                student.setUserId(response.getUserId());
                System.out.println("AuthenticationResponse userId: " + response.getUserId());

                // Sauvegarder l'étudiant dans la base de données
                Student savedStudent = studentRepository.save(student);
                System.out.println("Student successfully saved: " + savedStudent);
                return savedStudent;
            } else {
                System.err.println("Error creating user in AuthService");
                throw new RuntimeException("User creation failed in AuthService");
            }
        } catch (Exception ex) {
            System.err.println("Error during student creation: " + ex.getMessage());
            throw new RuntimeException("Student creation failed", ex);
        }
    }
}
