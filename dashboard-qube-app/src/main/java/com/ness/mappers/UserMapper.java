package com.ness.mappers;

import com.ness.dtos.UserDTO;
import com.ness.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements EntityDTOMapper<UserDTO, User>{

    @Override
    public UserDTO mapToDTO(User user) {
        return UserDTO.builder()
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .city(user.getCity())
            .country(user.getCountry())
            .dateOfBirth(user.getDateOfBirth())
            .email(user.getEmail())
            .phoneNumber(user.getPhoneNumber())
            .password(user.getPassword())
            .build();
    }

    @Override
    public User mapDTOTo(UserDTO userDTO) {
        return User.builder()
            .firstName(userDTO.getFirstName())
            .lastName(userDTO.getLastName())
            .city(userDTO.getCity())
            .country(userDTO.getCountry())
            .dateOfBirth(userDTO.getDateOfBirth())
            .email(userDTO.getEmail())
            .phoneNumber(userDTO.getPhoneNumber())
            .password(userDTO.getPassword())
            .build();
    }
}
