package com.ness.services;

import com.ness.dtos.UserDTO;
import com.ness.dtos.UserLoginDTO;
import com.ness.entities.User;

import java.util.List;
import java.util.Set;

public interface UserService {
    void save(UserDTO user);

    Set<User> getUsers();

    User findUserLogin(UserLoginDTO userLoginDTO);
    User findById(Integer l);
    List<User> findAllByEmail(String email);
}
