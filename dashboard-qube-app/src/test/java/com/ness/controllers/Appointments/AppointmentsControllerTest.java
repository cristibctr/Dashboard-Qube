package com.ness.controllers.Appointments;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ness.controllers.AppointmentsController;
import com.ness.services.AppointmentsService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AppointmentsControllerTest {
    AppointmentsController appointmentsController;
    MockMvc mockMvc;

    @Mock
    AppointmentsService appointmentsService;

    @Before
    public void setUp() throws Exception{
        MockitoAnnotations.initMocks(this);

        appointmentsController = new AppointmentsController(appointmentsService);
        mockMvc = MockMvcBuilders
            .standaloneSetup(appointmentsController)
            .setControllerAdvice(new Exception())
            .build();
    }

    @Test
    public void AppointmentIsValid() throws Exception{
        String requestString = "{\n" +
            "    \"createdByUser\": \"test@test.com\",\n" +
            "    \"title\": \"My new appointment\",\n" +
            "    \"contactType\": \"online meeting\",\n" +
            "    \"startDate\": \"12/12/2022 16:20\",\n" +
            "    \"endDate\": \"13/12/2022 16:20\",\n" +
            "    \"assignedToUser\": \"cristian123@email.com\",\n" +
            "    \"description\": \"A very long description\"\n" +
            "}";

        mockMvc.perform(post("/api/appointments")
            .contentType(MediaType.APPLICATION_JSON)
            .content(requestString))
            .andExpect(status().is(200));
    }

    @Test
    public void AppointmentStartDateIsInvalid() throws Exception{
        String requestString = "{\n" +
            "    \"createdByUser\": \"test@test.com\",\n" +
            "    \"title\": \"My new appointment\",\n" +
            "    \"contactType\": \"online meeting\",\n" +
            "    \"startDate\": \"12/12/2012 16:20\",\n" +
            "    \"endDate\": \"13/12/2022 16:20\",\n" +
            "    \"assignedToUser\": \"cristian123@email.com\",\n" +
            "    \"description\": \"A very long description\"\n" +
            "}";
        mockMvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(404));
    }


    @Test
    public void AppointmentDescriptionIsTooLong() throws Exception{
        String value = "A".repeat(600);
        String requestString = "{\n" +
            "    \"createdByUser\": \"test@test.com\",\n" +
            "    \"title\": \"My new appointment\",\n" +
            "    \"contactType\": \"online meeting\",\n" +
            "    \"startDate\": \"12/12/2022 16:20\",\n" +
            "    \"endDate\": \"13/12/2022 16:20\",\n" +
            "    \"assignedToUser\": \"cristian123@email.com\",\n" +
            "    \"description\": \"" + value + "\"\n" +
            "}";
        mockMvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(404));
    }

    @Test
    public void AppointmentTitleIsTooLong() throws Exception{
        String value = "A".repeat(600);
        String requestString = "{\n" +
            "    \"createdByUser\": \"test@test.com\",\n" +
            "    \"title\": \"" + value + "\",\n" +
            "    \"contactType\": \"online meeting\",\n" +
            "    \"startDate\": \"12/12/2022 16:20\",\n" +
            "    \"endDate\": \"13/12/2022 16:20\",\n" +
            "    \"assignedToUser\": \"cristian123@email.com\",\n" +
            "    \"description\": \"Test description\"\n" +
            "}";
        mockMvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(404));
    }

    @Test
    public void InvalidContactType() throws Exception{
        String requestString = "{\n" +
            "    \"createdByUser\": \"test@test.com\",\n" +
            "    \"title\": \"Test Title\",\n" +
            "    \"contactType\": \"abcd\",\n" +
            "    \"startDate\": \"12/12/2022 16:20\",\n" +
            "    \"endDate\": \"13/12/2022 16:20\",\n" +
            "    \"assignedToUser\": \"cristian123@email.com\",\n" +
            "    \"description\": \"Test description\"\n" +
            "}";
        mockMvc.perform(post("/api/appointments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(404));
    }

    @Test
    public void AppointmentIsDeleted() throws Exception{

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/appointments/11")).andExpect(status().is(200));
    }
    @Test
    public void AppointmentIsEdited() throws Exception{

        String requestString = "{\n" +
            "    \"id\": \"51\",\n" +
            "    \"createdByUser\": \"ee@email.com\",\n" +
            "    \"title\": \"test Title4\",\n" +
            "    \"contactType\": \"Showroom Meeting\",\n" +
            "    \"startDate\": \"20/05/2022 13:31\",\n" +
            "    \"endDate\": \"20/05/2022 15:51\",\n" +
            "    \"assignedToUser\": \"ee@email.com\",\n" +
            "    \"description\": \"\"\n" +
            "}";
        mockMvc.perform(patch("/api/appointment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(200));
    }

    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
