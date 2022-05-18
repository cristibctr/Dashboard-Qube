package com.ness.controllers.User;

import com.ness.controllers.UserController;
import com.ness.dtos.UserLoginDTO;
import com.ness.entities.User;
import com.ness.services.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.ZonedDateTime;
import java.util.Base64;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerLoginTest {
    UserController userController;
    MockMvc mockMvc;

    @Mock
    UserService userService;

    @Before
    public void setUp() throws Exception{
        MockitoAnnotations.initMocks(this);

        userController = new UserController(userService);
        mockMvc = MockMvcBuilders
            .standaloneSetup(userController)
            .setControllerAdvice(new Exception())
            .build();
    }

    @Test
    public void testCorrectLoginData() throws Exception{
        User user = User.builder()
            .email("test@test.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("Password1@3")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();
        when(userService.findUserLogin(any(UserLoginDTO.class))).thenReturn(user);
        mockMvc.perform(post("/api/login")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content(Base64.getEncoder().encodeToString("test@test.com:Password1@3".getBytes())))
            .andExpect(status().is(200));
    }

    @Test
    public void testNonexistentUser() throws Exception{
        when(userService.findUserLogin(any(UserLoginDTO.class))).thenReturn(null);
        mockMvc.perform(post("/api/login")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content(Base64.getEncoder().encodeToString("test@tddddest.com:Password1@3".getBytes())))
            .andExpect(status().is(401))
            .andExpect(content().string("User not found"));
    }

    @Test
    public void testWrongPassword() throws Exception{
        User user = User.builder()
            .email("test@test.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("Password1@3")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();
        when(userService.findUserLogin(any(UserLoginDTO.class))).thenReturn(user);
        mockMvc.perform(post("/api/login")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content(Base64.getEncoder().encodeToString("test@test.com:Passworrrrrd1@3".getBytes())))
            .andExpect(status().is(401))
            .andExpect(content().string("Incorrect password"));
    }

    @Test
    public void testMalformedInput() throws Exception{
        mockMvc.perform(post("/api/login")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content("abcntr56tshrabresfdv=="))
            .andExpect(status().is(418));
    }

    @Test
    public void testMissingColon() throws Exception {
        User user = User.builder()
            .email("test@test.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("Password1@3")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();
        when(userService.findUserLogin(any(UserLoginDTO.class))).thenReturn(user);
        mockMvc.perform(post("/api/login")
                .contentType(MediaType.TEXT_PLAIN_VALUE)
                .content(Base64.getEncoder().encodeToString("test@test.com".getBytes())))
            .andExpect(status().is(401))
            .andExpect(content().string("User not found"));
    }

}
