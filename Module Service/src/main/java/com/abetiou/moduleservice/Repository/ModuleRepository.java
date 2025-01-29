package com.abetiou.moduleservice.Repository;

import com.abetiou.moduleservice.Entities.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ModuleRepository extends JpaRepository<CourseModule,Long> {
    CourseModule findCourseModuleById(Long id);
}
