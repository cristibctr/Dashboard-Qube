package com.ness.mappers;

import com.ness.dtos.UserDTO;
import com.ness.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User mapUserDTOToUser(UserDTO source, User target){
        target =
            User.builder()
                .firstName(source.getFirstName())
                .lastName(source.getLastName())
                .city(source.getCity())
                .country(source.getCountry())
                .dateOfBirth(source.getDateOfBirth())
                .email(source.getEmail())
                .phoneNumber(source.getPhoneNumber())
                .password(source.getPassword())
                .build();
        return target;
    }

    public UserDTO mapUserToUserDTO(User source, UserDTO target){
        target =
            UserDTO.builder()
                .firstName(source.getFirstName())
                .lastName(source.getLastName())
                .city(source.getCity())
                .country(source.getCountry())
                .dateOfBirth(source.getDateOfBirth())
                .email(source.getEmail())
                .phoneNumber(source.getPhoneNumber())
                .password(source.getPassword())
                .build();
        return target;
    }

}
