package com.ness.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UserDTO {

    private Integer id;

    private String firstName;

    private String lastName;

    private Date dateOfBirth;

    private String phoneNumber;

    private String city;

    private String country;

    private String email;

    private String password;
}
