package com.krsoftwares.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class KrDengoBackendApplication {

    @Value("${NAME:World}")
    String name;

    @RestController
    class HelloworldController {

        @GetMapping("/")
        String hello() {
            return "HelloOOOOOWWWWWWW " + "!";
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(KrDengoBackendApplication.class, args);
    }

}
