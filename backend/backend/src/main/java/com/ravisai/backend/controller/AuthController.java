package com.ravisai.backend.controller;

import com.ravisai.backend.dto.LoginRequest;
import com.ravisai.backend.dto.LoginResponse;
import org.springframework.web.bind.annotation.*;

import com.ravisai.backend.dto.RegisterRequest;
import com.ravisai.backend.service.AuthService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}