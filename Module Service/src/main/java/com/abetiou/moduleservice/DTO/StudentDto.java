package com.abetiou.moduleservice.DTO;

import lombok.Data;

@Data
public class StudentDto {
    private Long id;
    private String codeAppogie;
    private String niveau;

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

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }
}
