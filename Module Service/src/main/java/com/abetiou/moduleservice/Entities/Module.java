package com.abetiou.moduleservice.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String moduleName;

    private int nombreHeures;

    // Référence à l'ID du professeur responsable
    private Long profId;

    // Liste des IDs des étudiants inscrits
    @ElementCollection
    private Set<Long> studentIds = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public int getNombreHeures() {
        return nombreHeures;
    }

    public void setNombreHeures(int nombreHeures) {
        this.nombreHeures = nombreHeures;
    }

    public Long getProfId() {
        return profId;
    }

    public void setProfId(Long profId) {
        this.profId = profId;
    }

    public Set<Long> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(Set<Long> studentIds) {
        this.studentIds = studentIds;
    }
}
