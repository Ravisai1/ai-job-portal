package com.ravisai.backend.service;

import com.ravisai.backend.dto.LoginRequest;
import com.ravisai.backend.jwt.jwtservice;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ravisai.backend.dto.RegisterRequest;
import com.ravisai.backend.entity.User;
import com.ravisai.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final jwtservice jwtService;

    public AuthService(UserRepository userRepository,PasswordEncoder passwordEncoder,jwtservice jwtservice) {
        this.userRepository = userRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService = jwtservice;
    }

    public String register(RegisterRequest request) {

        // check email exists
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        return "User registered successfully";
    }

    //Login
    public String login(LoginRequest request){
        User user =userRepository.findByEmail(request.getEmail()).orElse(null);
        if(user==null) {
            return "Invalid email";
        }
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid password";
        }
        String token = jwtService.generateToken(user.getEmail());
        return token;
    }
}