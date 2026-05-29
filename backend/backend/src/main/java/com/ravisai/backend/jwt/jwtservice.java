package com.ravisai.backend.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import io.jsonwebtoken.security.Keys;
import java.util.Date;

import static io.jsonwebtoken.Jwts.*;

@Service
public class jwtservice {
    private final String SECRET_KEY="ravisai_super_secret_key_for_jwt_authentication_2026";
    private Key getsignINkey(){
        byte[] keyBytes = SECRET_KEY.getBytes();
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String generateToken(String email ){
       return builder().subject(email).expiration(new Date(System.currentTimeMillis()+24*60*60*1000)).signWith(getsignINkey()).compact();
    }
    public String extractEmail(String token){
     return Jwts.parser().setSigningKey(getsignINkey()).build().parseSignedClaims(token).getPayload().getSubject();
    }
    public boolean validateToken(String token){
        try{
            Jwts.parser()
                    .setSigningKey(getsignINkey())
                    .build()
                    .parseSignedClaims(token);

            return true;

        }catch(Exception e){
            e.printStackTrace();   // ADD THIS
            return false;
        }
    }

}
