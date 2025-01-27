package com.abetiou.enrollmentservive;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class EnrollmentServiveApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnrollmentServiveApplication.class, args);
    }

}
