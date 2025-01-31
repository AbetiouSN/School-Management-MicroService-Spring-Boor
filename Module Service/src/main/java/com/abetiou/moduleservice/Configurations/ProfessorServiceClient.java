package com.abetiou.moduleservice.Configurations;

import com.abetiou.moduleservice.DTO.ProfUpdateRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
        name = "professor-service",
        url = "http://localhost:8083/professor"
)
public interface ProfessorServiceClient {

    @GetMapping("/{id}")
    ProfUpdateRequest getProfById(@PathVariable("id") Long id);
}

