package com.ravisai.backend.filter;

import com.ravisai.backend.jwt.jwtservice;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter  extends OncePerRequestFilter {
    private final jwtservice jwtservice;
    public JwtFilter(jwtservice jwtservice) {
        this.jwtservice = jwtservice;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
     String header=request.getHeader("Authorization");
     if(header == null||!header.startsWith("Bearer ")){
         filterChain.doFilter(request, response);
     }else
     {
         String token =header.substring(7);
         System.out.println(token);
         if(jwtservice.validateToken(token)){
             String email =jwtservice.extractEmail(token);
             UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null, Collections.emptyList());
             SecurityContextHolder.getContext().setAuthentication(authenticationToken);
             filterChain.doFilter(request, response);
         }else {
             response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
             return;
         }
     }
    }
}
