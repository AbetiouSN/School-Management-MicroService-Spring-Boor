package com.abetiou.etudiantservice.Services;

import com.abetiou.etudiantservice.Configurations.AuthenticationServiceClient;
import com.abetiou.etudiantservice.DTO.*;
import com.abetiou.etudiantservice.Entities.Student;
import com.abetiou.etudiantservice.Repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.file.AccessDeniedException;
import java.util.*;

@Service
public class StudentService {

    @Autowired
    private RestTemplate restTemplate;

    private final StudentRepository studentRepository;
    private final AuthenticationServiceClient authenticationServiceClient;

    public StudentService(StudentRepository studentRepository, AuthenticationServiceClient authenticationServiceClient) {
        this.studentRepository = studentRepository;
        this.authenticationServiceClient = authenticationServiceClient;
    }

    public Student createStudent(Student student, RegisterRequest registerRequest, String token) throws AccessDeniedException {
        try {
            // Log avant de vérifier l'authentification
            System.out.println("Checking user authentication with token: " + token);

            User authenticatedUser = authenticationServiceClient.getUserByToken(token);

            // Log après avoir récupéré l'utilisateur authentifié
            System.out.println("Authenticated user: " + authenticatedUser);

            if (!authenticatedUser.getRole().equalsIgnoreCase("ADMIN")) {
                throw new AccessDeniedException("Only admins can create students");
            }

            // Log avant de créer l'utilisateur
            System.out.println("Creating user in authentication service");

            AuthenticationResponse response = authenticationServiceClient.createUser(registerRequest);

            if (response != null && response.getUserId() != null) {
                // Log après avoir créé l'utilisateur
                System.out.println("User created successfully, User ID: " + response.getUserId());

                // Associer l'utilisateur créé au étudiant
                student.setUserId(response.getUserId());

                // Sauvegarder l'étudiant
                return studentRepository.save(student);
            } else {
                // Log si la réponse du service d'authentification est null
                System.out.println("Authentication service returned null response");
                throw new RuntimeException("User creation failed in authentication service. Response was null or invalid.");
            }
        } catch (AccessDeniedException ex) {
            // Log d'erreur si l'accès est refusé
            System.out.println("Access Denied: " + ex.getMessage());
            throw new AccessDeniedException("Access Denied: " + ex.getMessage());
        } catch (Exception ex) {
            // Log d'erreur générale
            System.out.println("Error during student creation: " + ex.getMessage());
            throw new RuntimeException("Error during student creation: " + ex.getMessage(), ex);
        }
    }



    public List<UpdateStudentRequest> getStudentByNiveau(String niveau) {
//        return studentRepository.findStudentByNiveau(niveau);
        List<Student> students = studentRepository.findStudentByNiveau(niveau);
        List<UpdateStudentRequest> updateStudentRequests = new ArrayList<>();

        for (Student student : students) {
            User user = authenticationServiceClient.findUserById(student.getUserId());
            updateStudentRequests.add(new UpdateStudentRequest(student, user));
        }

        return updateStudentRequests;
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


//    public List<Student> getStudentsByModuleId(Long moduleId) {
//
//        return studentRepository.findByModuleId(moduleId);
//    }

    public List<UpdateStudentRequest> getStudentsByModuleId(Long moduleId) {
        // Récupération des étudiants par moduleId
        List<Student> students = studentRepository.findByModuleId(moduleId);
        List<UpdateStudentRequest> updateStudentRequests = new ArrayList<>();

        for (Student student : students) {
            // Récupérer les informations utilisateur associées via le service d'authentification
            User user = authenticationServiceClient.findUserById(student.getUserId());
            updateStudentRequests.add(new UpdateStudentRequest(student, user));
        }

        return updateStudentRequests;
    }



    // separer etud 3la module
    @Transactional
    public boolean removeModuleFromStudent(Long studentId, Long moduleId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            boolean removed = student.getModuleIds().remove(moduleId);
            if (removed) {
                studentRepository.save(student); // Mettre à jour l'étudiant sans ce module
            }
            return removed;
        }
        return false; // Étudiant non trouvé
    }


    @Transactional
    public boolean addModuleToStudent(Long studentId, Long moduleId) {
        Optional<Student> studentOptional = studentRepository.findById(studentId);
        if (studentOptional.isPresent()) {
            Student student = studentOptional.get();
            boolean added = student.getModuleIds().add(moduleId); // Ajoute le module si absent
            if (added) {
                studentRepository.save(student); // Sauvegarde l'étudiant mis à jour
            }
            return added;
        }
        return false; // Étudiant non trouvé
    }


    // nbr d'etudiants selon le moduke
//    public Map<Long, Long> getStudentCountByModule() {
//        List<Object[]> results = studentRepository.getStudentCountByModule();
//        Map<Long, Long> studentCountByModule = new HashMap<>();
//
//        for (Object[] result : results) {
//            Long moduleId = (Long) result[0];
//            Long count = (Long) result[1];
//            studentCountByModule.put(moduleId, count);
//        }
//
//        return studentCountByModule;
//    }


    public Map<String, Long> getStudentCountByModule() {
        List<Object[]> results = studentRepository.getStudentCountByModule();
        Map<String, Long> studentCountByModule = new HashMap<>();

        for (Object[] result : results) {
            Long moduleId = (Long) result[0];
            Long count = (Long) result[1];

            // Utilisation de Feign pour récupérer le nom du module
            String moduleName = getModuleNameById(moduleId);

            studentCountByModule.put(moduleName, count);
        }

        return studentCountByModule;
    }

    private String getModuleNameById(Long moduleId) {
        try {
            CourseModule module = authenticationServiceClient.getModuleById(moduleId);
            return (module != null) ? module.getModuleName() : "Unknown Module";
        } catch (Exception e) {
            return "Unknown Module";
        }
    }


    public UpdateStudentRequest getStudentByToken(String token) {
        // Fetch user by token from the authentication service
        User user = authenticationServiceClient.getUserByToken(token);

        if (user == null || user.getId() == null) {
            throw new RuntimeException("User not found for the provided token.");
        }

        // Find student by userId
        Student student = studentRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Student not found for user ID: " + user.getId()));

        // Return the DTO with student and user information
        return new UpdateStudentRequest(student, user);
    }

}
