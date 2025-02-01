package com.abetiou.moduleservice.Repository;

import com.abetiou.moduleservice.Entities.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ModuleRepository extends JpaRepository<CourseModule,Long> {
    CourseModule findCourseModuleById(Long id);

    // Méthode pour récupérer les modules par ID de professeur
    List<CourseModule> findByProfId(Long profId);

    Optional<CourseModule> findByIdAndProfId(Long moduleId, Long profId);

    List<CourseModule> findBySemestre(String semestre);

}
