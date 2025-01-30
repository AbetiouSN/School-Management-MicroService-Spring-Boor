package com.abetiou.moduleservice.Services;

import com.abetiou.moduleservice.DTO.ModuleWithStudentCount;
import com.abetiou.moduleservice.DTO.StudentDto;
import com.abetiou.moduleservice.Entities.CourseModule;
import com.abetiou.moduleservice.Repository.ModuleRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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


    //AFFECTATION STUDNET <==> MODULE
    public CourseModule assignStudentsToModule(Long moduleId, String niveau) {
        // URL pour récupérer les étudiants par niveau
        String url = "http://localhost:8082/students/allStudentsWithNiveau/" + niveau;

        // URL pour assigner le module aux étudiants
        String url2 = "http://localhost:8082/students/assignModuleToStudent";

        // Créer un RestTemplate
        RestTemplate restTemplate = new RestTemplate();

        // 1. Appel pour récupérer la liste des étudiants par niveau
        ResponseEntity<List<StudentDto>> response;
        try {
            response = restTemplate.exchange(
                    url, HttpMethod.GET, null, new ParameterizedTypeReference<List<StudentDto>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch students from service Student: " + e.getMessage());
        }

        // Vérification de la réponse
        if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
            throw new RuntimeException("Failed to fetch students or empty response");
        }

        // Extraire les IDs des étudiants
        Set<Long> studentIds = response.getBody().stream()
                .map(StudentDto::getId)
                .collect(Collectors.toSet());

        // 2. Appel pour assigner le module aux étudiants récupérés
        // Préparer les headers de la requête
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Créer les paramètres de la requête
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("moduleId", moduleId.toString());
        params.add("niveau", niveau);

        // Préparer la requête
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

        try {
            restTemplate.exchange(url2, HttpMethod.POST, requestEntity, Void.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to assign module to students: " + e.getMessage());
        }

        // 3. Récupérer le module existant
        CourseModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found with ID: " + moduleId));

        // Ajouter les IDs des étudiants au module
        module.setStudentIds(studentIds);

        // 4. Sauvegarder le module avec les étudiants assignés
        return moduleRepository.save(module);
    }


    //trouver module par id
    public CourseModule findModuleById(Long moduleId) {
        return moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found with ID: " + moduleId));
    }


    public List<CourseModule> courseModuleList(){
        return moduleRepository.findAll();
    }


    public List<CourseModule> getModulesByProfId(Long profId) {
        return moduleRepository.findByProfId(profId);
    }

    public List<ModuleWithStudentCount> getModulesWithStudentCount() {
        // Ensure `findAll()` is called on the instance
        return moduleRepository.findAll().stream()
                .map(module -> new ModuleWithStudentCount(
                        module.getId(),
                        module.getModuleName(),
                        module.getNombreHeures(),
                        module.getSemestre(),
                        module.getProfId(),
                        module.getStudentIds().size()
                ))
                .collect(Collectors.toList());
    }


}
