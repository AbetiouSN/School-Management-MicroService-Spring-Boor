package com.abetiou.professorservice.DTO;

import com.abetiou.professorservice.Entities.Prof;
import lombok.Data;

@Data
public class ProfCreationRequest {
    private Prof prof;
    private RegisterRequest registerRequest;

    public Prof getProf() {
        return prof;
    }

    public void setProf(Prof prof) {
        this.prof = prof;
    }

    public RegisterRequest getRegisterRequest() {
        return registerRequest;
    }

    public void setRegisterRequest(RegisterRequest registerRequest) {
        this.registerRequest = registerRequest;
    }
}
