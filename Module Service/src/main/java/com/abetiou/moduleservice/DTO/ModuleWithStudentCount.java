package com.abetiou.moduleservice.DTO;

public class ModuleWithStudentCount {

    private Long id;
    private String moduleName;
    private int nombreHeures;
    private String semestre;
    private Long profId;
    private int studentCount;

    public ModuleWithStudentCount(Long id, String moduleName, int nombreHeures, String semestre, Long profId, int studentCount) {
        this.id = id;
        this.moduleName = moduleName;
        this.nombreHeures = nombreHeures;
        this.semestre = semestre;
        this.profId = profId;
        this.studentCount = studentCount;
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

    public String getSemestre() {
        return semestre;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }

    public Long getProfId() {
        return profId;
    }

    public void setProfId(Long profId) {
        this.profId = profId;
    }

    public int getStudentCount() {
        return studentCount;
    }

    public void setStudentCount(int studentCount) {
        this.studentCount = studentCount;
    }
}

