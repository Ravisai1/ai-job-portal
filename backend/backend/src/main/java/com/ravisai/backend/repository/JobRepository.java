package com.ravisai.backend.repository;

import com.ravisai.backend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCreatedBy(String createdBy);

}
