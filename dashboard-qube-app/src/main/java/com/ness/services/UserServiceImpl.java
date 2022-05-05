package com.ness.services;


import com.ness.dtos.UserDTO;
import com.ness.dtos.UserLoginDTO;
import com.ness.entities.User;
import com.ness.mappers.UserMapper;
import com.ness.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void save(UserDTO userDTO) {
        UserMapper userMapper = new UserMapper();
        User user = new User();
        this.userRepository.save(userMapper.mapUserDTOToUser(userDTO, user));
    }

    @Override
    public Set<User> getUsers() {
        Set<User> userSet = new HashSet<>();
        userRepository.findAll().forEach(user -> {
            userSet.add(user);
        });
        return userSet;
    }


    @Override
    public User findById(Integer id) {
        Optional<User> recipeOptional = userRepository.findById(id);
        if(!recipeOptional.isPresent()){
            throw new Error("User Not Found!");
        }
        return recipeOptional.get();
    }

    @Override
    public User findUserLogin(UserLoginDTO userLoginDTO){
        return userRepository.findByEmail(userLoginDTO.getEmail());
    }

    @Override
    public List<User> findAllByEmail(String email) {
        return userRepository.findAllByEmail(email);
    }
}
