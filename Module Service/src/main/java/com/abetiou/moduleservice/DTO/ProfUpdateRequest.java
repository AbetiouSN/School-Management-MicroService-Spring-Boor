package com.abetiou.moduleservice.DTO;

public class ProfUpdateRequest {
    private Prof prof;
    private User registerRequest;

    public ProfUpdateRequest() {
    }

    public ProfUpdateRequest(Prof prof, User registerRequest) {
        this.prof = prof;
        this.registerRequest = registerRequest;
    }

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
