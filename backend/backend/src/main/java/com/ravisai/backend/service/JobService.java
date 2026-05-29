package com.ravisai.backend.service;

import com.ravisai.backend.entity.Job;
import com.ravisai.backend.repository.JobRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    private final JobRepository jobRepository;
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public String addJob(Job job) {
        jobRepository.save(job);
        return "Job added successfully";
    }

    public List<Job> getJobs() {
        return jobRepository.findAll();
    }

}
