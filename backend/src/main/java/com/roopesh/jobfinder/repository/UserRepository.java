package com.roopesh.jobfinder.repository;
import com.roopesh.jobfinder.model.User; import org.springframework.data.jpa.repository.JpaRepository; import java.util.Optional;
public interface UserRepository extends JpaRepository<User,Long>{Optional<User> findByEmail(String email);}
