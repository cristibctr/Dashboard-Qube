package com.ness.services;

import com.ness.dtos.UserDTO;
import com.ness.entities.User;

import java.util.Set;

public interface UserService {
    void save(UserDTO user);

    Set<User> getUsers();

    User findById(Integer l);
}
