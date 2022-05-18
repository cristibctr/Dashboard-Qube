package com.ness.controllers.User;

import com.ness.controllers.UserController;
import com.ness.entities.User;
import com.ness.services.UserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.util.collections.Sets;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserControllerGetTest {
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
    public void testGetUsernames() throws Exception{
        User user1 = User.builder()
            .email("test1@test.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("Password1@3")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();
        User user2 = User.builder()
            .email("test2@test.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("Password1@3")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();
        Set<User> usersList = new HashSet<>(Sets.newSet(user1, user2));
        when(userService.getUsers()).thenReturn(usersList);
        mockMvc.perform(get("/api/users")
                .contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(status().is(200))
            .andExpect(content().json("[\"test1@test.com\",\"test2@test.com\"]"));
    }
}
