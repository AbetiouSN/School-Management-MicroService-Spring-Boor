package com.abetiou.professorservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/professor")
public class TestController {
    @GetMapping("test")
    public String test() {
        return "Professor Service is working";
    }
}
