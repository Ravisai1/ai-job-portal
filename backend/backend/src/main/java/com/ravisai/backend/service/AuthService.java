package com.ravisai.backend.service;

import org.springframework.stereotype.Service;

import com.ravisai.backend.dto.RegisterRequest;
import com.ravisai.backend.entity.User;
import com.ravisai.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String register(RegisterRequest request) {

        // check email exists
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully";
    }
}