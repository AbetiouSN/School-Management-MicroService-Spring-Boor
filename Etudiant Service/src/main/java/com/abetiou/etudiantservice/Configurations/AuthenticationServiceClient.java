package com.abetiou.etudiantservice.Configurations;

import com.abetiou.etudiantservice.DTO.AuthenticationResponse;
import com.abetiou.etudiantservice.DTO.RegisterRequest;
import com.abetiou.etudiantservice.DTO.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@FeignClient(
        name = "authentication-service",
        url = "http://localhost:8081/auth",
        configuration = FeignConfiguration.class
)
public interface AuthenticationServiceClient {

    @PostMapping("/create-user")
    AuthenticationResponse createUser(@RequestBody RegisterRequest request); // Retourne AuthenticationResponse directement

    @GetMapping("/user/{userId}")
    User getUserById(@PathVariable("userId") Integer userId);

    @GetMapping("/user/token")
    User getUserByToken(@RequestHeader("Authorization") String token);

}


