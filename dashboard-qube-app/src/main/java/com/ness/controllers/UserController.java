package com.ness.controllers;

import com.ness.entities.User;
import com.ness.services.UserServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserServiceImpl userServiceImpl;

    public UserController(UserServiceImpl userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @PostMapping("/new/user")
    public void save(@RequestBody User user){
        System.out.println("It enters");
        User newUser = this.userServiceImpl.save(user);
    }

    @GetMapping("/")
    public String show(){
        return "It enterss";
    }

}
