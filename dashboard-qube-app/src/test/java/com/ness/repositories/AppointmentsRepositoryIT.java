package com.ness.repositories;

import com.ness.entities.Appointment;
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

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestPropertySource("/application.properties")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AppointmentsRepositoryIT {

    @Autowired
    AppointmentsRepository appointmentsRepository;
    Appointment appointment;

    @Autowired
    UserRepository userRepository;
    User user;

    @BeforeAll
    void setUp() {
        user = User.builder()
            .email("test@test.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("Password1@3")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();
        userRepository.save(user);
        appointment = Appointment.builder()
            .createdByUser(user)
            .contactType("email")
            .startDate(LocalDateTime.from(ZonedDateTime.now().plusDays(2)))
            .endDate(LocalDateTime.from(ZonedDateTime.now().plusDays(3)))
            .assignedToUser(user)
            .description("Test description")
            .title("Test title")
            .build();
        appointmentsRepository.save(appointment);
    }

    @AfterAll
    void cleanUp() {
        appointmentsRepository.delete(appointment);
        userRepository.delete(user);
    }

    @Test
    void findAssignmentByCreatedUserEmail() throws Exception{
        Optional<List<Appointment>> foundAppointment = Optional.ofNullable(appointmentsRepository.findByCreatedByUser_Email("test@test.com"));
        assertEquals(foundAppointment.get().get(0).getId(), appointment.getId());
    }

    @Test
    void findAssignmentByAssignedUserEmail() throws Exception{
        Optional<List<Appointment>> foundAppointment = Optional.ofNullable(appointmentsRepository.findByAssignedToUser_Email("test@test.com"));
        assertEquals(foundAppointment.get().get(0).getId(), appointment.getId());
    }
}
