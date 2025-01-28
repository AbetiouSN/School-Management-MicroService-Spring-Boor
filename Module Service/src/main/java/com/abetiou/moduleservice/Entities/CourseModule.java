package com.abetiou.moduleservice.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
public class CourseModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String moduleName;

    private int nombreHeures;

    private String semestre;

    private Long profId;

    @ElementCollection
    private Set<Long> studentIds = new HashSet<>();

    // Constructeur complet
    public CourseModule(Long id, String moduleName, int nombreHeures,String semestre, Long profId, Set<Long> studentIds) {
        this.id = id;
        this.moduleName = moduleName;
        this.nombreHeures = nombreHeures;
        this.semestre = semestre;
        this.profId = profId;
        this.studentIds = (studentIds != null) ? studentIds : new HashSet<>();
    }

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

    public String getSemestre() {
        return semestre;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }
}
