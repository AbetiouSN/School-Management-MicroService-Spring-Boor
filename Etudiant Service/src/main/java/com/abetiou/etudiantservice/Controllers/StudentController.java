package com.abetiou.etudiantservice.Controllers;

import com.abetiou.etudiantservice.DTO.StudentCreationRequest;
import com.abetiou.etudiantservice.DTO.UpdateStudentRequest;
import com.abetiou.etudiantservice.DTO.User;
import com.abetiou.etudiantservice.Entities.Student;
import com.abetiou.etudiantservice.Services.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<?> createStudent(
            @RequestBody StudentCreationRequest request,
            @RequestHeader("Authorization") String token
    ) {
        try {
            // Appeler le service pour créer le professeur
            Student createdStudent = studentService.createStudent(request.getStudent(), request.getRegisterRequest(), token);
            return ResponseEntity.ok(createdStudent);

        } catch (AccessDeniedException ex) {
            // Gérer les erreurs d'accès non autorisé
            return ResponseEntity.status(403).body("Access denied: " + ex.getMessage());
        } catch (Exception ex) {
            // Gérer les autres exceptions
            return ResponseEntity.status(500).body("Error during student creation: " + ex.getMessage());
        }
    }

    @GetMapping("/allStudentsWithNiveau/{niveau}")
    public ResponseEntity<?> getStudentByNiveau(@PathVariable String niveau) {
        return new ResponseEntity<>(studentService.getStudentByNiveau(niveau), HttpStatus.OK);
    }

    // Endpoint to assign a module to students based on their niveau
    @PostMapping("/assignModuleToStudent")
    public void assignModuleToStudents(@RequestParam Long moduleId, @RequestParam String niveau) {
        System.out.println("ModuleId: " + moduleId + ", Niveau: " + niveau);

        studentService.assignModuleToStudentsByNiveau(moduleId, niveau);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody UpdateStudentRequest request
    ) {
        Student updatedStudent = studentService.updateStudentById(id, request.getStudent(), request.getUser());

        if (updatedStudent != null) {
            return ResponseEntity.ok(updatedStudent);
        }

        return ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUStudentById(@PathVariable Long id){
        studentService.deleteStudentById(id);
        return ResponseEntity.ok("Student deleted successfully");
    }


    //etudiant avec les detailles
    @GetMapping("/students/cin/{cin}")
    public ResponseEntity<UpdateStudentRequest> findStudentByCin(@PathVariable String cin) {
        UpdateStudentRequest student = studentService.findStudentByCin(cin);
        if (student != null) {
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/students/codeAppogie/{codeAppogie}")
    public ResponseEntity<UpdateStudentRequest> findStudentByCodeAppogie(@PathVariable String codeAppogie) {
        UpdateStudentRequest student = studentService.findStudentByCodeAppogie(codeAppogie);
        if (student != null) {
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.notFound().build();
    }


    @GetMapping("/students")
    public ResponseEntity<List<UpdateStudentRequest>> findAllStudent() {
        List<UpdateStudentRequest> students = studentService.findAllStudent();
        if (students != null && !students.isEmpty()) {
            return ResponseEntity.ok(students);
        }
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    //trouver liste des etudiants par module
    @GetMapping("/by-module/{moduleId}")
    public List<Student> getStudentsByModule(@PathVariable Long moduleId) {
        return studentService.getStudentsByModuleId(moduleId);
    }


    @DeleteMapping("/{studentId}/modules/{moduleId}")
    public ResponseEntity<String> removeModuleFromStudent(@PathVariable Long studentId, @PathVariable Long moduleId) {
        boolean removed = studentService.removeModuleFromStudent(studentId, moduleId);
        if (removed) {
            return ResponseEntity.ok("Module retiré avec succès de l'étudiant.");
        } else {
            return ResponseEntity.badRequest().body("Échec du retrait du module.");
        }
    }

    @PostMapping("/{studentId}/modules/{moduleId}")
    public ResponseEntity<String> addModuleToStudent(@PathVariable Long studentId, @PathVariable Long moduleId) {
        boolean added = studentService.addModuleToStudent(studentId, moduleId);
        if (added) {
            return ResponseEntity.ok("Module affecté avec succès à l'étudiant.");
        } else {
            return ResponseEntity.badRequest().body("Échec de l'affectation du module.");
        }
    }

    //nbr d'etuduants selom module
    @GetMapping("/count-by-module")
    public Map<String, Long> getStudentCountByModule() {
        return studentService.getStudentCountByModule();
    }
}
