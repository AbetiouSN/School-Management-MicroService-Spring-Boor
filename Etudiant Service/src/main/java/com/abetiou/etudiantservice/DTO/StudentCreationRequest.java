package com.abetiou.etudiantservice.DTO;

import com.abetiou.etudiantservice.Entities.Student;
import lombok.Data;

@Data
public class StudentCreationRequest {
    private Student student;
    private RegisterRequest registerRequest;

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public RegisterRequest getRegisterRequest() {
        return registerRequest;
    }

    public void setRegisterRequest(RegisterRequest registerRequest) {
        this.registerRequest = registerRequest;
    }
}
