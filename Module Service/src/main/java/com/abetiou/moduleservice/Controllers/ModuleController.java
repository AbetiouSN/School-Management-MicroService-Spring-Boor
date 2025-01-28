package com.abetiou.moduleservice.Controllers;

import com.abetiou.moduleservice.Entities.CourseModule;
import com.abetiou.moduleservice.Services.ModuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/modules")
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

}
