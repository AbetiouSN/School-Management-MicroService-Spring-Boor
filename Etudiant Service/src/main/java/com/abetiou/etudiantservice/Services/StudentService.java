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
        ResponseEntity<AuthenticationResponse> response = authenticationServiceClient.createUser(registerRequest);

        if (response.getStatusCode().is2xxSuccessful()) {
            student.setUserId(response.getBody().getUserId());
            return studentRepository.save(student);
        } else {
            throw new RuntimeException("User creation failed");
        }
    }
}
