package com.ravisai.backend.service;

import com.ravisai.backend.entity.Job;
import com.ravisai.backend.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
      
    public Optional<Job> getJobById(long id) {
        return jobRepository.findById(id);
    }
    public String deleteJob(long id) {
        jobRepository.deleteById(id);
        return "Job deleted successfully";
    }

}
