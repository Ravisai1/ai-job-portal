package com.ravisai.backend.controller;

import com.ravisai.backend.dto.StatusUpdateRequest;
import com.ravisai.backend.entity.Application;
import com.ravisai.backend.service.ApplicationService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    private final ApplicationService applicationService;
    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }
    @PostMapping("/{jobId}/apply")
    public String applyForJob(@PathVariable Long jobId, @RequestBody Application application) {
        System.out.println("Application Controller reached");
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        application.setUserEmail(email);

        application.setJobId(jobId);
        application.setStatus("Applied");
        return applicationService.applyForJob(application);
    }
    @GetMapping("/my")
    public List<Application> getApplicationsByEmail() {
        String email =SecurityContextHolder.getContext().getAuthentication().getName();
        return applicationService.getApplicationsByEmail(email);
    }
    @GetMapping("/jobId/{jobId}")
    public List<Application> getApplicationByJobId(@PathVariable Long jobId){
        return applicationService.getApplicationsByJobId(jobId);
    }

    @PutMapping("/{id}/status")
    public String UpdateStatus(@PathVariable Long id,@RequestBody StatusUpdateRequest status){
        return applicationService.updateStatus(id,status);
    }
}
