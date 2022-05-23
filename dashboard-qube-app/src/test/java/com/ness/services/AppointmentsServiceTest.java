package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.entities.Appointment;
import com.ness.entities.User;
import com.ness.repositories.AppointmentsRepository;
import com.ness.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppointmentsServiceTest {
    AppointmentsService appointmentsService;
    @Mock
    AppointmentsRepository appointmentsRepository;
    @Mock
    UserRepository userRepository;

    @Before
    public void setUp(){
        MockitoAnnotations.initMocks(this);
        appointmentsService = new AppointmentsServiceImpl(appointmentsRepository, userRepository);
    }

    @Test
    public void saveTest(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(31)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        User user = User.builder()
            .id(24)
            .email("email@email.com")
            .firstName("myFirstName")
            .lastName("myLastName")
            .password("Password1@3")
            .dateOfBirth(Date.from(ZonedDateTime.now().minusYears(19).toInstant()))
            .build();
        when(userRepository.findByEmail(anyString())).thenReturn(user);
        appointmentsService.save(appointmentDTO);
        verify(appointmentsRepository, times(1)).save(any(Appointment.class));
    }
}
