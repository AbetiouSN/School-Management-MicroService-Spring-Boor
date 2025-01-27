package com.abetiou.etudiantservice;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testEtudiat {
    @GetMapping("test")
    public String test() {
        return "Etudiant Service is working";
    }
}
