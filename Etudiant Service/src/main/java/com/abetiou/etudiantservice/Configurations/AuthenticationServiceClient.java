package com.abetiou.etudiantservice.Configurations;

import com.abetiou.etudiantservice.DTO.AuthenticationResponse;
import com.abetiou.etudiantservice.DTO.RegisterRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
@FeignClient(
        name = "authentication-service",
        url = "http://localhost:8081/api/v1/auth",
        configuration = FeignConfiguration.class
)
public interface AuthenticationServiceClient {

    @PostMapping("/create-user")
    AuthenticationResponse createUser(@RequestBody RegisterRequest request); // Retourne AuthenticationResponse directement
}


