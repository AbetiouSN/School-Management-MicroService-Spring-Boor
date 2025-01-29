package com.abetiou.etudiantservice.DTO;

import com.abetiou.etudiantservice.Entities.Student;

public class UpdateStudentRequest{

    private Student student;
    private User user;

    public UpdateStudentRequest() {}

    public UpdateStudentRequest(Student student, User user) {
        this.student = student;
        this.user = user;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
