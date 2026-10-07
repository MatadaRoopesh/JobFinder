package com.roopesh.jobfinder.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity
@Table(name="job_applications")
public class JobApplication {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @JsonIgnore
    @ManyToOne(optional=false, fetch=FetchType.LAZY) @JoinColumn(name="user_id") private User user;
    @Column(nullable=false) private String externalJobId;
    @Column(nullable=false, length=500) private String title;
    private String company; private String location;
    @Column(length=1500) private String applicationLink;
    @Enumerated(EnumType.STRING) @Column(nullable=false) private ApplicationStatus status=ApplicationStatus.APPLIED;
    private LocalDateTime appliedAt=LocalDateTime.now();
    @Column(length=1000) private String notes;
    public JobApplication(){}
    public Long getId(){return id;} public User getUser(){return user;} public String getExternalJobId(){return externalJobId;} public String getTitle(){return title;} public String getCompany(){return company;} public String getLocation(){return location;} public String getApplicationLink(){return applicationLink;} public ApplicationStatus getStatus(){return status;} public LocalDateTime getAppliedAt(){return appliedAt;} public String getNotes(){return notes;}
    public void setId(Long v){id=v;} public void setUser(User v){user=v;} public void setExternalJobId(String v){externalJobId=v;} public void setTitle(String v){title=v;} public void setCompany(String v){company=v;} public void setLocation(String v){location=v;} public void setApplicationLink(String v){applicationLink=v;} public void setStatus(ApplicationStatus v){status=v;} public void setNotes(String v){notes=v;}
}
