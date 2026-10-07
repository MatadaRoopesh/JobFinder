package com.roopesh.jobfinder.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable=false, unique=true) private String email;
    @Column(nullable=false) private String password;
    @Column(nullable=false) private String name;
    @Column(nullable=false) private LocalDateTime createdAt = LocalDateTime.now();

    public User() {}
    public User(String name, String email, String password) { this.name=name; this.email=email; this.password=password; }
    public Long getId(){return id;} public String getEmail(){return email;} public String getPassword(){return password;} public String getName(){return name;} public LocalDateTime getCreatedAt(){return createdAt;}
    public void setId(Long id){this.id=id;} public void setEmail(String email){this.email=email;} public void setPassword(String password){this.password=password;} public void setName(String name){this.name=name;}
}
