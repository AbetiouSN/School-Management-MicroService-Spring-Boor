package com.abetiou.etudiantservice.Repository;

import com.abetiou.etudiantservice.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {

    List<Student> findStudentByNiveau(String niveau);

}
