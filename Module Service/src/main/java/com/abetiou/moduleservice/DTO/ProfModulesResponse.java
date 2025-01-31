package com.abetiou.moduleservice.DTO;

import com.abetiou.moduleservice.Entities.CourseModule;

import java.util.List;

public class ProfModulesResponse {
    private List<CourseModule> modules;
    private ProfUpdateRequest profDetails;

    public ProfModulesResponse(List<CourseModule> modules, ProfUpdateRequest profDetails) {
        this.modules = modules;
        this.profDetails = profDetails;
    }

    public List<CourseModule> getModules() {
        return modules;
    }

    public void setModules(List<CourseModule> modules) {
        this.modules = modules;
    }

    public ProfUpdateRequest getProfDetails() {
        return profDetails;
    }

    public void setProfDetails(ProfUpdateRequest profDetails) {
        this.profDetails = profDetails;
    }

    // Getters and setters
}

