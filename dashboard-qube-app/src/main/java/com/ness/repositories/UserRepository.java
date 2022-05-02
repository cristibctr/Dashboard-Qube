package com.ness.repositories;

import com.ness.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    public List<User> findAllByEmail(String email);
}
