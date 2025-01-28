package com.abetiou.etudiantservice.Entities;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codeAppogie;
    private String cin;

    // bax nqdo njnbdo wahd list dyal students 3ndom nfs niveau wn affectiwh lwahd module
    // ATLQAW WAHD METHODE GETALLSTUDENTSBYNIVEAU
    private String niveau;


    // Référence à l'ID de l'utilisateur dans le service d'authentification
    private Long userId;

    // Liste des IDs des modules auxquels l'étudiant est inscrit
    @ElementCollection
    private Set<Long> moduleIds = new HashSet<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodeAppogie() {
        return codeAppogie;
    }

    public void setCodeAppogie(String codeAppogie) {
        this.codeAppogie = codeAppogie;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Set<Long> getModuleIds() {
        return moduleIds;
    }

    public void setModuleIds(Set<Long> moduleIds) {
        this.moduleIds = moduleIds;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }
}
