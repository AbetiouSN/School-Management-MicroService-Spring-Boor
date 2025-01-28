package com.abetiou.moduleservice.Services;

import com.abetiou.moduleservice.DTO.StudentDto;
import com.abetiou.moduleservice.Entities.CourseModule;
import com.abetiou.moduleservice.Repository.ModuleRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;
    private final RestTemplate restTemplate;


    public ModuleService(ModuleRepository moduleRepository,RestTemplate restTemplate) {
        this.moduleRepository = moduleRepository;
        this.restTemplate = restTemplate;
    }

    // Méthode pour créer un module et l'affecter à un professeur
    public CourseModule createModule(String moduleName, int nombreHeures,String semestre, Long profId) {
        CourseModule courseModule = new CourseModule(null, moduleName, nombreHeures,semestre, profId, null);
        return moduleRepository.save(courseModule);
    }

    public CourseModule assignStudentsToModule(Long moduleId, String niveau) {
        // Appel au service étudiant pour récupérer les étudiants par niveau
        String url = "http://localhost:8082/students/allStudentsWithNiveau/" + niveau;

        // Utilisation de ParameterizedTypeReference pour correctement mappez la réponse en List<StudentDto>
        ResponseEntity<List<StudentDto>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<List<StudentDto>>() {});

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Failed to fetch students");
        }

        // Extraire les IDs des étudiants
        Set<Long> studentIds = response.getBody().stream()
                .map(StudentDto::getId)
                .collect(Collectors.toSet());

        // Récupérer le module
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));

        // Ajouter les IDs des étudiants
        module.setStudentIds(studentIds);

        return moduleRepository.save(module);
    }


}
