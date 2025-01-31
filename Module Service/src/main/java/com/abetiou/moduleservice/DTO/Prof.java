package com.abetiou.moduleservice.DTO;

import java.util.Set;

public class Prof {
    private Long id;
    private String cin;
    private Long userId;
    private Set<Long> moduleIds;

    public Prof() {
    }

    public Prof(Long id, String cin, Long userId, Set<Long> moduleIds) {
        this.id = id;
        this.cin = cin;
        this.userId = userId;
        this.moduleIds = moduleIds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}
