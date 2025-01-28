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
}
