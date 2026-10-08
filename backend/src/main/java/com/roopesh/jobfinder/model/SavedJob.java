package com.roopesh.jobfinder.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "saved_jobs",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_saved_job_user_external",
            columnNames = {"user_id", "external_job_id"}
        )
    }
)
public class SavedJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "external_job_id", nullable = false)
    private String externalJobId;

    @Column(nullable = false, length = 500)
    private String title;

    private String company;

    private String location;

    @Column(length = 1500)
    private String applicationLink;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDateTime savedAt = LocalDateTime.now();

    public SavedJob() {
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getExternalJobId() {
        return externalJobId;
    }

    public String getTitle() {
        return title;
    }

    public String getCompany() {
        return company;
    }

    public String getLocation() {
        return location;
    }

    public String getApplicationLink() {
        return applicationLink;
    }

    public String getDescription() {
        return description;
    }

    public LocalDateTime getSavedAt() {
        return savedAt;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setExternalJobId(String externalJobId) {
        this.externalJobId = externalJobId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setApplicationLink(String applicationLink) {
        this.applicationLink = applicationLink;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setSavedAt(LocalDateTime savedAt) {
        this.savedAt = savedAt;
    }
}