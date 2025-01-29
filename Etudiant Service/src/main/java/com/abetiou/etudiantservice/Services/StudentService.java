package com.abetiou.etudiantservice.Services;

import com.abetiou.etudiantservice.Configurations.AuthenticationServiceClient;
import com.abetiou.etudiantservice.DTO.AuthenticationResponse;
import com.abetiou.etudiantservice.DTO.RegisterRequest;
import com.abetiou.etudiantservice.DTO.UpdateStudentRequest;
import com.abetiou.etudiantservice.DTO.User;
import com.abetiou.etudiantservice.Entities.Student;
import com.abetiou.etudiantservice.Repository.StudentRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
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


    // Method to assign a module to a list of students based on their niveau
    public void assignModuleToStudentsByNiveau(Long moduleId, String niveau) {
        // Retrieve all students with the given niveau
        List<Student> students = studentRepository.findStudentByNiveau(niveau);

        // Add the module to each student's module list
        for (Student student : students) {
            student.getModuleIds().add(moduleId);  // Add the module ID
            studentRepository.save(student);
        }
    }

    // Modifi etudian par id

    public Student updateStudentById(Long id, Student student, User user) {
        Student oldStudent = studentRepository.findStudentById(id);

        if (oldStudent != null) {
            oldStudent.setCin(student.getCin());
            oldStudent.setCodeAppogie(student.getCodeAppogie());
            oldStudent.setDateInscription(student.getDateInscription());
            oldStudent.setDateInscription(student.getDateInscription());
            oldStudent.setNiveau(student.getNiveau());

            // Call Authentication Service to update user details via Feign
            User updatedUser = authenticationServiceClient.updateUser(
                    oldStudent.getUserId(),
                    user.getFirstname(),
                    user.getLastname(),
                    user.getEmail()
            );

            // Check if the user update was successful and save the student
            if (updatedUser != null) {
                studentRepository.save(oldStudent);
            }

            return oldStudent;
        }

        // Return null if the student with the given id was not found
        return null;
    }

    //delete User by id
    public void deleteStudentById(Long id){
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (student != null){
            studentRepository.delete(student);
            authenticationServiceClient.deleteUser(student.getUserId());

            System.out.println("User deleted successfully");
        }
    }

    // find Student by Cin

    public UpdateStudentRequest findStudentByCin(String cin){
        Student student = studentRepository.findStudentByCin(cin);
        if(student != null){
            User user = authenticationServiceClient.findUserById(student.getUserId());
            return new UpdateStudentRequest(student, user);
        }
        return null;
    }

    // find Student by Cin
    public UpdateStudentRequest findStudentByCodeAppogie(String appogie){
        Student student = studentRepository.findStudentByCin(appogie);
        if(student != null){
            User user = authenticationServiceClient.findUserById(student.getUserId());
            return new UpdateStudentRequest(student, user);
        }
        return null;
    }



    // find all student with detaill (users )
    public List<UpdateStudentRequest> findAllStudent(){
        List<Student> students = studentRepository.findAll();
        List<UpdateStudentRequest> updateStudentRequests = new ArrayList<>();

        for (Student student : students){
            User user = authenticationServiceClient.findUserById(student.getUserId());
            updateStudentRequests.add(new UpdateStudentRequest(student, user));
        }

        return updateStudentRequests;
    }

}
