package com.roopesh.jobfinder.controller;

import com.roopesh.jobfinder.dto.JobRequest; import com.roopesh.jobfinder.dto.StatusRequest; import com.roopesh.jobfinder.model.*; import com.roopesh.jobfinder.repository.*; import org.springframework.http.*; import org.springframework.security.core.Authentication; import org.springframework.web.bind.annotation.*; import java.util.*;

@RestController @RequestMapping("/api/me") public class UserController {
 private final UserRepository users; private final SavedJobRepository saved; private final JobApplicationRepository apps;
 public UserController(UserRepository users,SavedJobRepository saved,JobApplicationRepository apps){this.users=users;this.saved=saved;this.apps=apps;}
 private User user(Authentication a){return users.findByEmail(a.getName()).orElseThrow();}
 @GetMapping("/saved-jobs") public List<SavedJob> saved(Authentication a){return saved.findByUserIdOrderBySavedAtDesc(user(a).getId());}
 @PostMapping("/saved-jobs") public ResponseEntity<?> save(Authentication a,@RequestBody JobRequest r){User u=user(a);if(saved.findByUserIdAndExternalJobId(u.getId(),r.externalJobId()).isPresent())return ResponseEntity.status(409).body(Map.of("message","Job already saved"));SavedJob j=new SavedJob();j.setUser(u);j.setExternalJobId(r.externalJobId());j.setTitle(r.title());j.setCompany(r.company());j.setLocation(r.location());j.setApplicationLink(r.applicationLink());j.setDescription(r.description());return ResponseEntity.ok(saved.save(j));}
 @DeleteMapping("/saved-jobs/{jobId}") public ResponseEntity<?> unsave(Authentication a,@PathVariable String jobId){saved.deleteByUserIdAndExternalJobId(user(a).getId(),jobId);return ResponseEntity.noContent().build();}
 @GetMapping("/applications") public List<JobApplication> applications(Authentication a){return apps.findByUserIdOrderByAppliedAtDesc(user(a).getId());}
 @PostMapping("/applications") public JobApplication apply(Authentication a,@RequestBody JobRequest r){User u=user(a);JobApplication j=new JobApplication();j.setUser(u);j.setExternalJobId(r.externalJobId());j.setTitle(r.title());j.setCompany(r.company());j.setLocation(r.location());j.setApplicationLink(r.applicationLink());j.setStatus(ApplicationStatus.APPLIED);j.setNotes("");return apps.save(j);}
 @PutMapping("/applications/{id}") public ResponseEntity<?> update(Authentication a,@PathVariable Long id,@RequestBody StatusRequest r){JobApplication j=apps.findByIdAndUserId(id,user(a).getId()).orElseThrow();if(r.status()!=null)j.setStatus(r.status());if(r.notes()!=null)j.setNotes(r.notes());return ResponseEntity.ok(apps.save(j));}
 @DeleteMapping("/applications/{id}") public ResponseEntity<?> delete(Authentication a,@PathVariable Long id){JobApplication j=apps.findByIdAndUserId(id,user(a).getId()).orElseThrow();apps.delete(j);return ResponseEntity.noContent().build();}
}
