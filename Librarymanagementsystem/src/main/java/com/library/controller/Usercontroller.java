package com.library.controller;

import com.library.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class Usercontroller {

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return "User registered successfully";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        // Simple check for credentials (no password hashing here)
        return "User logged in successfully";
    }
}
