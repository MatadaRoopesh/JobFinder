package com.roopesh.jobfinder.repository;
import com.roopesh.jobfinder.model.*; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface SavedJobRepository extends JpaRepository<SavedJob,Long>{List<SavedJob> findByUserIdOrderBySavedAtDesc(Long userId); Optional<SavedJob> findByUserIdAndExternalJobId(Long userId,String id); void deleteByUserIdAndExternalJobId(Long userId,String id);}
