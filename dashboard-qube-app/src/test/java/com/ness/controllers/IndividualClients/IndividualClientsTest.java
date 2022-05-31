package com.ness.controllers.IndividualClients;

import com.ness.controllers.AppointmentsController;
import com.ness.controllers.IndividualClientsController;
import com.ness.services.IndividualClientsService;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class IndividualClientsTest {

    IndividualClientsController individualClientsController;
    MockMvc mockMvc;

    @Mock
    IndividualClientsService individualClientsService;

    @Before
    public void setUp() throws Exception{
        MockitoAnnotations.initMocks(this);

        individualClientsController = new IndividualClientsController(individualClientsService);
        mockMvc = MockMvcBuilders
            .standaloneSetup(individualClientsController)
            .setControllerAdvice(new Exception())
            .build();
    }

    @Test
    public void testGetAll() throws Exception{
        mockMvc.perform(get("/api/clients"))
            .andExpect(status().is(200));
    }

    @Test
    public void testSave() throws Exception{
        String requestString = "{\n" +
            "\"salutation\": \"MR\",\n" +
            "\"firstName\": \"Koy\",\n" +
            " \"lastName\": \"Mckoy\",\n" +
            "  \"dateOfBirth\": \"21/05/1981\",\n" +
            "   \"nationality\": \"American\",\n" +
            "   \"streetName\": \"Swimlane\",\n" +
            "   \"number\": \"23A\",\n" +
            "   \"building\": \"2\",\n" +
            "   \"apartment\": \"34\",\n" +
            "   \"floor\": \"14\",\n" +
            "   \"postalCode\": \"334A4\",\n" +
            "   \"city\": \"Silver City (settlement)\",\n" +
            "   \"country\": \"Christmas Island\",\n" +
            "   \"email\": \"koy@email.com\",\n" +
            "   \"phoneNumber\": \"0040733234123\" \n" +
        "}";

        mockMvc.perform(post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(200));
    }

    @Test
    public void testIfEmailOrPhoneNumber1() throws Exception{
        String requestString = "{\n" +
            "\"salutation\": \"MR\",\n" +
            "\"firstName\": \"Koy\",\n" +
            " \"lastName\": \"Mckoy\",\n" +
            "  \"dateOfBirth\": \"21/05/1981\",\n" +
            "   \"nationality\": \"American\",\n" +
            "   \"streetName\": \"Swimlane\",\n" +
            "   \"number\": \"23A\",\n" +
            "   \"building\": \"2\",\n" +
            "   \"apartment\": \"34\",\n" +
            "   \"floor\": \"14\",\n" +
            "   \"postalCode\": \"334A4\",\n" +
            "   \"city\": \"Silver City (settlement)\",\n" +
            "   \"country\": \"Christmas Island\",\n" +
            "   \"email\": \"\",\n" +
            "   \"phoneNumber\": \"0040733234123\" \n" +
            "}";

        mockMvc.perform(post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(200));
    }

    @Test
    public void testIfEmailOrPhoneNumber2() throws Exception{
        String requestString = "{\n" +
            "\"salutation\": \"MR\",\n" +
            "\"firstName\": \"Koy\",\n" +
            " \"lastName\": \"Mckoy\",\n" +
            "  \"dateOfBirth\": \"21/05/1981\",\n" +
            "   \"nationality\": \"American\",\n" +
            "   \"streetName\": \"Swimlane\",\n" +
            "   \"number\": \"23A\",\n" +
            "   \"building\": \"2\",\n" +
            "   \"apartment\": \"34\",\n" +
            "   \"floor\": \"14\",\n" +
            "   \"postalCode\": \"334A4\",\n" +
            "   \"city\": \"Silver City (settlement)\",\n" +
            "   \"country\": \"Christmas Island\",\n" +
            "   \"email\": \"koy@email.com\",\n" +
            "   \"phoneNumber\": \"\" \n" +
            "}";

        mockMvc.perform(post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(200));
    }
    @Test
    public void testIfNotEmailAndNotPhoneNumber() throws Exception{
        String requestString = "{\n" +
            "\"salutation\": \"MR\",\n" +
            "\"firstName\": \"Koy\",\n" +
            " \"lastName\": \"Mckoy\",\n" +
            "  \"dateOfBirth\": \"21/05/1981\",\n" +
            "   \"nationality\": \"American\",\n" +
            "   \"streetName\": \"Swimlane\",\n" +
            "   \"number\": \"23A\",\n" +
            "   \"building\": \"2\",\n" +
            "   \"apartment\": \"34\",\n" +
            "   \"floor\": \"14\",\n" +
            "   \"postalCode\": \"334A4\",\n" +
            "   \"city\": \"Silver City (settlement)\",\n" +
            "   \"country\": \"Christmas Island\",\n" +
            "   \"email\": \"\",\n" +
            "   \"phoneNumber\": \"\" \n" +
            "}";

        mockMvc.perform(post("/api/clients")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestString))
            .andExpect(status().is(404));
    }
}
