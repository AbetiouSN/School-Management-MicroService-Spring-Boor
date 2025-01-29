package com.abetiou.etudiantservice.Repository;

import com.abetiou.etudiantservice.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {

    List<Student> findStudentByNiveau(String niveau);
    Student findStudentById(Long id);

    @Override
    void delete(Student entity);

//    Student findStudentByUser_Id(Long id);

    Student findStudentByCin(String cin);

    Student findStudnetByCodeAppogie(String codeAppogie);

    // Recherche des étudiants par module ID
    @Query("SELECT s FROM Student s JOIN s.moduleIds m WHERE m = :moduleId")
    List<Student> findByModuleId(@Param("moduleId") Long moduleId);



}


