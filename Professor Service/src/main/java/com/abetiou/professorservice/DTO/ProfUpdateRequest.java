package com.abetiou.professorservice.DTO;

import com.abetiou.professorservice.Entities.Prof;
public class ProfUpdateRequest {
    private Prof prof;
    private User registerRequest;

    // Getters and Setters
    public Prof getProf() {
        return prof;
    }

    public void setProf(Prof prof) {
        this.prof = prof;
    }

    public User getRegisterRequest() {
        return registerRequest;
    }

    public void setRegisterRequest(User registerRequest) {
        this.registerRequest = registerRequest;
    }
}
