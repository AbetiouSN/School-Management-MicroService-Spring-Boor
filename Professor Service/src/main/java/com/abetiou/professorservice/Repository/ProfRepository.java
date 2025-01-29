package com.abetiou.professorservice.Repository;

import com.abetiou.professorservice.Entities.Prof;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfRepository extends JpaRepository<Prof,Long> {
    Optional<Prof> findProfById(Long id);}
