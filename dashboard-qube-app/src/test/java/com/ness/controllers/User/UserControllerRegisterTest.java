package com.ness.controllers.User;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ness.controllers.UserController;
import com.ness.dtos.UserDTO;
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

import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerRegisterTest {
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
    public void testEmailIsNull() throws Exception{
        UserDTO user = new UserDTO();
        user.setEmail(null);
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
            .andExpect(status().is4xxClientError());
    }

    @Test
    public void testDateOfBirthIsNull() throws Exception{
        UserDTO user = new UserDTO();
        user.setDateOfBirth(null);
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
            .andExpect(status().is4xxClientError());
    }

    @Test
    public void testPasswordIsNull() throws Exception{
        UserDTO user = new UserDTO();
        user.setPassword(null);
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
            .andExpect(status().is4xxClientError());
    }

    @Test
    public void testFirstNameIsNull() throws Exception{
        UserDTO user = new UserDTO();
        user.setFirstName(null);
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
            .andExpect(status().is4xxClientError());
    }

    @Test
    public void testLastNameIsNull() throws Exception{
        UserDTO user = new UserDTO();
        user.setLastName(null);
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
            .andExpect(status().is4xxClientError());
    }

    @Test
    public void testValidUser() throws Exception{
        UserDTO user = UserDTO.builder()
            .email("myemail@email.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
            .andExpect(status().isCreated());
    }

    @Test
    public void testExistingEmail() throws Exception{
        UserDTO userDTO = UserDTO.builder()
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.now().minus(1, ChronoUnit.DAYS)))
            .build();
        User user = User.builder()
            .email("myemail@hmm.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.now().minus(1, ChronoUnit.DAYS)))
            .build();
        List<User> usersList = new ArrayList<>();
        usersList.add(user);
        when(userService.findAllByEmail(anyString())).thenReturn(usersList);
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(userDTO)))
            .andExpect(status().is4xxClientError());
    }

    @Test
    public void testInvalidEmail() throws Exception{
        UserDTO user = UserDTO.builder()
            .email("my..email@email.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.now().minus(1, ChronoUnit.DAYS)))
            .build();

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(asJsonString(user)))
            .andExpect(status().is4xxClientError());
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
