package com.abetiou.moduleservice.Controllers;

import com.abetiou.moduleservice.DTO.ModuleWithStudentCount;
import com.abetiou.moduleservice.DTO.ProfModulesResponse;
import com.abetiou.moduleservice.Entities.CourseModule;
import com.abetiou.moduleservice.Services.ModuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/modules")
@CrossOrigin(origins = "http://localhost:4200")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @PostMapping("/create")
    public ResponseEntity<CourseModule> createModule(
            @RequestParam String moduleName,
            @RequestParam int nombreHeures,
            @RequestParam String semestre,
            @RequestParam Long profId) {

        CourseModule createdModule = moduleService.createModule(moduleName, nombreHeures,semestre, profId);
        return ResponseEntity.ok(createdModule);
    }

    // Endpoint pour affecter une liste d'étudiants à un module
    @PutMapping("/{moduleId}/assign-students")
    public ResponseEntity<CourseModule> assignStudentsToModule(
            @PathVariable Long moduleId,
            @RequestParam String niveau) {

        CourseModule updatedModule = moduleService.assignStudentsToModule(moduleId, niveau);
        return ResponseEntity.ok(updatedModule);
    }

    // Endpoint pour récupérer un module par son ID
    @GetMapping("/{moduleId}")
    public ResponseEntity<CourseModule> getModuleById(@PathVariable Long moduleId) {
        CourseModule module = moduleService.findModuleById(moduleId);
        return ResponseEntity.ok(module);
    }

    @GetMapping("/allmodules")
    public ResponseEntity<List<CourseModule>> getAllModules() {
        List<CourseModule> courseModules = moduleService.courseModuleList();
        return ResponseEntity.ok(courseModules);
    }

//    @GetMapping("/prof/{profId}")
//    public List<CourseModule> getModulesByProfId(@PathVariable Long profId) {
//        return moduleService.getModulesByProfId(profId);
//    }

    @GetMapping("/prof/{profId}")
    public ProfModulesResponse getModulesAndProfDetails(@PathVariable Long profId) {
        return moduleService.getModulesAndProfDetails(profId);
    }

    @GetMapping("/with-student-count")
    public List<ModuleWithStudentCount> getModulesWithStudentCount() {
        return moduleService.getModulesWithStudentCount();
    }



    //delete prof from module

    @DeleteMapping("/delete")
    public String deleteModuleByProf(@RequestParam Long moduleId, @RequestParam Long profId) {
        moduleService.deleteModuleByProf(moduleId, profId);
        return "Module successfully deleted.";
    }

    @GetMapping("/by-niveau")
    public List<CourseModule> getModulesBySemestre(@RequestParam String niveau) {
        return moduleService.getModulesBySemestre(niveau);
    }

}
