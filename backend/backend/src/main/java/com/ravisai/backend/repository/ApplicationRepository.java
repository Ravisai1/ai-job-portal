package com.ravisai.backend.repository;

import com.ravisai.backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApplicationRepository  extends JpaRepository<Application,Long> {
    List<Application> findByJobId(Long jobId);

    boolean existsByUserEmailAndJobId(String userEmail, Long jobId);
     List<Application> findByUserEmail(String email);

}
