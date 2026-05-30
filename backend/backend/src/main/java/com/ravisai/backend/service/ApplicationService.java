package com.ravisai.backend.service;

import com.ravisai.backend.dto.StatusUpdateRequest;
import com.ravisai.backend.entity.Application;
import com.ravisai.backend.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }
    public String applyForJob(Application application){
        if(applicationRepository.existsByUserEmailAndJobId(application.getUserEmail(), application.getJobId())){
            return "Already applied";
        }else{

        applicationRepository.save(application);
        return "Applied successfully";
    }
    }
    public List<Application> getApplicationsByEmail(String email){
        return applicationRepository.findByUserEmail(email);
    }

    public List<Application> getApplicationsByJobId(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }
    public String updateStatus(Long id, StatusUpdateRequest status){
      Optional<Application> application = applicationRepository.findById(id);
      if (application.isPresent()){
          application.get().setStatus(status.getStatus());
          applicationRepository.save(application.get());
          return "Status updated successfully";
      }else{
          return "Application not found";
      }

    }
}
