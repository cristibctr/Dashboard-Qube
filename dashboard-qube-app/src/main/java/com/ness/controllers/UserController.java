package com.ness.controllers;

import com.ness.dtos.UserDTO;
import com.ness.entities.User;
import com.ness.misc.UserValidator;
import com.ness.services.UserService;
import com.ness.services.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    private final UserService userServiceImpl;
    Logger logger = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {
        this.userServiceImpl = userService;
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/api/users", produces=MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> save(@RequestBody UserDTO user){
        if(user.getEmail() == null || user.getDateOfBirth() == null ||
            user.getPassword() == null || user.getFirstName() == null ||
            user.getLastName() == null)
        {
            return ResponseEntity.status(400).body("Required field missing");
        }

        if(!UserValidator.validate(user))
            return ResponseEntity.status(400).body("Invalid request body");

        if (!this.userServiceImpl.findByEmail(user.getEmail()).isEmpty())
        {
            return ResponseEntity.status(409).body("User already exists");
        }

        try{
            this.userServiceImpl.save(user);
            return ResponseEntity.status(201).body("User created");
        }
        catch (Exception e)
        {
            logger.error(e.toString());
            return ResponseEntity.status(500).body("Internal server error");
        }
    }
}
