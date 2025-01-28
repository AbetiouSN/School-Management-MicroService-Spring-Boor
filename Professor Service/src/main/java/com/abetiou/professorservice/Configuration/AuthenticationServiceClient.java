package com.abetiou.professorservice.Configuration;


import com.abetiou.professorservice.DTO.AuthenticationResponse;
import com.abetiou.professorservice.DTO.RegisterRequest;
import com.abetiou.professorservice.DTO.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(
        name = "authentication-service",
        url = "http://localhost:8081/api/v1/auth",
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


