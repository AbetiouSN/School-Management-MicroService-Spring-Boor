package com.abetiou.professorservice.Repository;

import com.abetiou.professorservice.Entities.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfRepository extends JpaRepository<Prof,Long> {
}
