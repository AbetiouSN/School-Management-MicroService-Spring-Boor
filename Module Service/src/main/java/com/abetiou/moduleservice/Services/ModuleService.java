package com.abetiou.moduleservice.Services;

import com.abetiou.moduleservice.Entities.CourseModule;
import com.abetiou.moduleservice.Repository.ModuleRepository;
import org.springframework.stereotype.Service;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    // Méthode pour créer un module et l'affecter à un professeur
    public CourseModule createModule(String moduleName, int nombreHeures,String semestre, Long profId) {
        CourseModule courseModule = new CourseModule(null, moduleName, nombreHeures,semestre, profId, null);
        return moduleRepository.save(courseModule);
    }
}
