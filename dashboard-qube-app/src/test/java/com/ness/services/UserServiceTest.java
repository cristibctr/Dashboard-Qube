package com.ness.services;

import com.ness.dtos.UserDTO;
import com.ness.entities.User;
import com.ness.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceTest {
    UserService userService;
    @Mock
    UserRepository userRepository;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        userService = new UserServiceImpl(userRepository);
    }

    @Test
    public void findByIdTest(){
        User user = User.builder()
            .id(946)
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.now().minus(1, ChronoUnit.DAYS)))
            .build();
        when(userRepository.findById(anyInt())).thenReturn(Optional.ofNullable(user));
        User foundUser = userService.findById(946);
        assertEquals(946, foundUser.getId());
    }

    @Test
    public void saveTest(){
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.now().minus(1, ChronoUnit.DAYS)))
            .build();
        userService.save(userDTO);
        verify(userRepository, times(1)).save(any());
    }

    @Test
    public void getUsersTest(){
        userService.getUsers();
        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void getUsersEmailTest(){
        userService.findAllByEmail("myemail@a.com");
        verify(userRepository, times(1)).findAllByEmail(anyString());
    }
}
