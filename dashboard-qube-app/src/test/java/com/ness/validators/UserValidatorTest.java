package com.ness.validators;

import com.ness.dtos.UserDTO;
import com.ness.misc.UserValidator;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserValidatorTest {
    @Before
    public void setUp(){
    }

    @Test
    public void validUserTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .build();
        assertEquals(true, UserValidator.validate(userDTO));
    }
    @Test
    public void invalidEmailUserTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myem..ail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .build();
        assertEquals(false, UserValidator.validate(userDTO));
    }
    @Test
    public void invalidDateUserTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2008-11-30T18:35:24.00Z")))
            .build();
        assertEquals(false, UserValidator.validate(userDTO));
    }
    @Test
    public void invalidFirstNameTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .firstName("myFir  2stName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .build();
        assertEquals(false, UserValidator.validate(userDTO));
    }
    @Test
    public void invalidLastNameTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastNa 2me")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .build();
        assertEquals(false, UserValidator.validate(userDTO));
    }
    @Test
    public void invalidPhoneNumberTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .phoneNumber("4535435")
            .build();
        assertEquals(false, UserValidator.validate(userDTO));
    }
    @Test
    public void invalidCityTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .city("dsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknk")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .build();
        assertEquals(false, UserValidator.validate(userDTO));
    }
    @Test
    public void invalidCountryTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .country("dsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknkdsafdsgdjgnviunkjvnjknkjnknjnknnjknk")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .build();
        assertEquals(false, UserValidator.validate(userDTO));
    }
}
