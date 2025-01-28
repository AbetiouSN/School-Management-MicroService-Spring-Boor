package com.springsecurity.springsecurity.auth;

import com.springsecurity.springsecurity.user.User;
import com.springsecurity.springsecurity.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthenticationController {

private  final AuthenticationSercvice authenticationSercvice;

    @Autowired
    private UserRepository repository;

    @PostMapping("/register")
    public  ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(authenticationSercvice.register(request));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/create-user")
    public ResponseEntity<AuthenticationResponse> createUser(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationSercvice.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(authenticationSercvice.authenticate(request));
    }


    @GetMapping("/user/{userId}")
    public User getUserById(@PathVariable Integer userId) {
        return authenticationSercvice.findUserById(userId);
    }

    @GetMapping("/user/token")
    public User getUserByToken(@RequestHeader("Authorization") String token) {
        // Vérifier si le token est présent et valide
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);  // Extrait le token après "Bearer "
            return authenticationSercvice.findUserByToken(token);
        } else {
            throw new AccessDeniedException("Token is missing or invalid");
        }
    }


}
