package com.java.config;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.library")
public class Librarymanagement {
    public static void main(String[] args) {
        SpringApplication.run(Librarymanagement.class, args);
    }
}
