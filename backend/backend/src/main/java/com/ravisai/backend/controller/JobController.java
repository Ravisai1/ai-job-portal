package com.ravisai.backend.controller;

import com.ravisai.backend.entity.Job;
import com.ravisai.backend.service.JobService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService){
        this.jobService = jobService;
    }
   @PostMapping("/addjobs")
    public String addJob(@RequestBody Job job) {
       String email = SecurityContextHolder.getContext()
               .getAuthentication()
               .getName();
       job.setCreatedBy(email);
        return jobService.addJob(job);
    }

    @GetMapping("/getjobs")
    public List<Job> getJobs() {
        return jobService.getJobs();
    }
}
