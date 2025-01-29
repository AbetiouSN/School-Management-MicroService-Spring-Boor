package com.abetiou.dashboardservice.Enities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.Date;
import java.util.Map;

@Entity
@Table(name = "dashboard_statistics")
public class DashboardStatistics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalStudents;
    private int totalProfessors;
    private int totalModules;
    private int totalEnrollments;

    private String mostPopularModule;
    private String mostActiveStudent;

    @ElementCollection
    @CollectionTable(name = "students_per_level", joinColumns = @JoinColumn(name = "dashboard_id"))
    @MapKeyColumn(name = "niveau")
    @Column(name = "student_count")
    private Map<String, Integer> studentsPerLevel;

    @ElementCollection
    @CollectionTable(name = "students_per_module", joinColumns = @JoinColumn(name = "dashboard_id"))
    @MapKeyColumn(name = "module_id")
    @Column(name = "student_count")
    private Map<Long, Integer> studentsPerModule;

    private LocalDate lastUpdated;

    // Constructeurs
    public DashboardStatistics() {}

    public DashboardStatistics(int totalStudents, int totalProfessors, int totalModules, int totalEnrollments,
                               String mostPopularModule, String mostActiveStudent,
                               Map<String, Integer> studentsPerLevel, Map<Long, Integer> studentsPerModule,
                               LocalDate lastUpdated) {
        this.totalStudents = totalStudents;
        this.totalProfessors = totalProfessors;
        this.totalModules = totalModules;
        this.totalEnrollments = totalEnrollments;
        this.mostPopularModule = mostPopularModule;
        this.mostActiveStudent = mostActiveStudent;
        this.studentsPerLevel = studentsPerLevel;
        this.studentsPerModule = studentsPerModule;
        this.lastUpdated = LocalDate.now();
    }

    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getTotalStudents() { return totalStudents; }
    public void setTotalStudents(int totalStudents) { this.totalStudents = totalStudents; }

    public int getTotalProfessors() { return totalProfessors; }
    public void setTotalProfessors(int totalProfessors) { this.totalProfessors = totalProfessors; }

    public int getTotalModules() { return totalModules; }
    public void setTotalModules(int totalModules) { this.totalModules = totalModules; }

    public int getTotalEnrollments() { return totalEnrollments; }
    public void setTotalEnrollments(int totalEnrollments) { this.totalEnrollments = totalEnrollments; }

    public String getMostPopularModule() { return mostPopularModule; }
    public void setMostPopularModule(String mostPopularModule) { this.mostPopularModule = mostPopularModule; }

    public String getMostActiveStudent() { return mostActiveStudent; }
    public void setMostActiveStudent(String mostActiveStudent) { this.mostActiveStudent = mostActiveStudent; }

    public Map<String, Integer> getStudentsPerLevel() { return studentsPerLevel; }
    public void setStudentsPerLevel(Map<String, Integer> studentsPerLevel) { this.studentsPerLevel = studentsPerLevel; }

    public Map<Long, Integer> getStudentsPerModule() { return studentsPerModule; }
    public void setStudentsPerModule(Map<Long, Integer> studentsPerModule) { this.studentsPerModule = studentsPerModule; }

    public LocalDate getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDate lastUpdated) { this.lastUpdated = lastUpdated; }
}

