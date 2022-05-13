package com.ness.repositories;

import com.ness.entities.User;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource("/application.properties")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserRepositoryIT {

    @Autowired
    UserRepository userRepository;
    User user;
    Integer userId;

    @BeforeAll
    void setUp() {
        user = User.builder()
            .email("my.test.email2794@em6ail.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("aBc123!!@")
            .dateOfBirth(Date.from(Instant.parse("2000-11-30T18:35:24.00Z")))
            .build();
        userRepository.save(user);
        userId = user.getId();
    }
    @AfterAll
    void cleanUp(){
        userRepository.delete(user);
    }

    @Test
    void findById() throws Exception{
        Optional<User> userOptional = userRepository.findById(userId);
        assertEquals(userId, userOptional.get().getId());
    }

    @Test
    void findByEmail() throws Exception{
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail("my.test.email2794@em6ail.com"));
        assertEquals(userId, userOptional.get().getId());
    }
}
