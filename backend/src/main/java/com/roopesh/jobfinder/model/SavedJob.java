package com.roopesh.jobfinder.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;

@Entity
@Table(name="saved_jobs", uniqueConstraints=@UniqueConstraint(columnNames={"user_id","externalJobId"}))
public class SavedJob {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
    @JsonIgnore
    @ManyToOne(optional=false, fetch=FetchType.LAZY) @JoinColumn(name="user_id") private User user;
    @Column(nullable=false) private String externalJobId;
    @Column(nullable=false, length=500) private String title;
    private String company;
    private String location;
    @Column(length=1500) private String applicationLink;
    @Column(length=5000) private String description;
    private LocalDateTime savedAt=LocalDateTime.now();
    public SavedJob(){}
    public Long getId(){return id;} public User getUser(){return user;} public String getExternalJobId(){return externalJobId;} public String getTitle(){return title;} public String getCompany(){return company;} public String getLocation(){return location;} public String getApplicationLink(){return applicationLink;} public String getDescription(){return description;} public LocalDateTime getSavedAt(){return savedAt;}
    public void setId(Long id){this.id=id;} public void setUser(User user){this.user=user;} public void setExternalJobId(String v){externalJobId=v;} public void setTitle(String v){title=v;} public void setCompany(String v){company=v;} public void setLocation(String v){location=v;} public void setApplicationLink(String v){applicationLink=v;} public void setDescription(String v){description=v;}
}
