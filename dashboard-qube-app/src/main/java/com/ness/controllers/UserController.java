package com.ness.controllers;

import com.ness.dtos.UserDTO;
import com.ness.dtos.UserLoginDTO;
import com.ness.entities.User;
import com.ness.misc.UserValidator;
import com.ness.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

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

        if (!this.userServiceImpl.findAllByEmail(user.getEmail()).isEmpty())
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

    @CrossOrigin(origins = "*")
    @PostMapping(path="/api/login", produces=MediaType.TEXT_PLAIN_VALUE, consumes = MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> login(@RequestBody String base64Credentials){
        try {
            String decodedString = new String(Base64.getDecoder().decode(base64Credentials));
            String[] userCredentials = decodedString.split(":", 2);
            UserLoginDTO userLoginDTO = new UserLoginDTO(userCredentials[0], userCredentials[1]);
            User dbUser = userServiceImpl.findUserLogin(userLoginDTO);
            if (dbUser == null)
                return ResponseEntity.status(401).body("User not found");
            if (dbUser.getPassword().equals(userLoginDTO.getPassword()))
                return ResponseEntity.status(200).body("Authorized");
            return ResponseEntity.status(401).body("Incorrect password");
        }
        catch (IllegalArgumentException e)
        {
            return ResponseEntity.status(418).body("Sticks and stones may break my bones but malformed inputs will never hurt me");
        }
    }
}
