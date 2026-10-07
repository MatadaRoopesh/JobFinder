package com.roopesh.jobfinder.repository;
import com.roopesh.jobfinder.model.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface JobApplicationRepository extends JpaRepository<JobApplication,Long>{List<JobApplication> findByUserIdOrderByAppliedAtDesc(Long userId); Optional<JobApplication> findByIdAndUserId(Long id,Long userId);}
