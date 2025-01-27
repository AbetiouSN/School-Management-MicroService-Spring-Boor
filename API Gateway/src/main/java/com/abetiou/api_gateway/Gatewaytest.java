package com.abetiou.api_gateway;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Gatewaytest {
    @GetMapping("test")
    public String test() {
        return "Api Gateway is working";
    }
}
