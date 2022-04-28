package com.ness.services;

import com.ness.entities.User;

import java.util.Set;

public interface UserService {
    User save(User user);

    Set<User> getUsers();

    User findById(Integer l);
}
