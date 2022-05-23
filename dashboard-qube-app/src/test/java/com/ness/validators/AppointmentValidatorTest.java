package com.ness.validators;

import com.ness.dtos.AppointmentDTO;
import com.ness.misc.AppointmentsValidator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppointmentValidatorTest {
    @Test
    public void validAppointment(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), true);
    }

    @Test
    public void validAppointmentWithoutDescription(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), true);
    }

    @Test
    public void invalidAssignedToUser(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), false);
    }

    @Test
    public void invalidCreatedByUser(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), false);
    }

    @Test
    public void longInvalidDescription(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("A".repeat(500))
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), false);
    }

    @Test
    public void longInvalidTitle(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("test description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("A".repeat(500))
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), false);
    }

    @Test
    public void invalidStartDate(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2021, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), false);
    }

    @Test
    public void invalidEndDate(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2021, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), false);
    }

    @Test
    public void invalidContactType(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("invalid type")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validate(appointmentDTO), false);
    }

    @Test
    public void validOldAppointment(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), true);
    }

    @Test
    public void validOldAppointmentWithoutDescription(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), true);
    }

    @Test
    public void invalidOldAppointmentWrongStartEndDates(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), false);
    }

    @Test
    public void invalidOldAssignedToUser(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), false);
    }

    @Test
    public void invalidOldCreatedByUser(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), false);
    }

    @Test
    public void longInvalidOldDescription(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("A".repeat(500))
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), false);
    }

    @Test
    public void longInvalidOldTitle(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("sms")
            .createdByUser("email@email.com")
            .description("test description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("A".repeat(500))
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), false);
    }



    @Test
    public void invalidOldContactType(){
        AppointmentDTO appointmentDTO = AppointmentDTO.builder()
            .id(52)
            .assignedToUser("email@email.com")
            .contactType("invalid type")
            .createdByUser("email@email.com")
            .description("Test Description")
            .startDate(LocalDateTime.of(2022, 12, 12, 8, 30))
            .endDate(LocalDateTime.of(2022, 12, 12, 10, 30))
            .title("Test title")
            .build();
        assertEquals(AppointmentsValidator.validateOldAppointment(appointmentDTO), false);
    }
}