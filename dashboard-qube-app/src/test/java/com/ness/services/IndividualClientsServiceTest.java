package com.ness.services;

import com.ness.dtos.IndividualClientDTO;
import com.ness.entities.IndividualClient;
import com.ness.mappers.EntityDTOMapper;
import com.ness.misc.Salutation;
import com.ness.repositories.IndividualClientsRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class IndividualClientsServiceTest {
    IndividualClientsService individualClientsService;
    @Mock
    IndividualClientsRepository individualClientsRepository;
    @Autowired
    EntityDTOMapper<IndividualClientDTO, IndividualClient> entityDTOMapper;

    @Before
    public void setUp()
    {
        MockitoAnnotations.initMocks(this);
        individualClientsService = new IndividualClientServiceImpl(individualClientsRepository, entityDTOMapper);
    }

    @Test
    public void getIndividualClientsTest()
    {
        IndividualClient individualClient1 = IndividualClient.builder()
            .id(23)
            .dateOfBirth(Date.from(LocalDate.of(1973, 11, 18).atStartOfDay(ZoneId.of("Europe/Bucharest")).toInstant()))
            .apartment("23")
            .building("2A")
            .city("Paris")
            .country("France")
            .email("test@test.com")
            .firstName("John")
            .lastName("Doe")
            .floor("2")
            .nationality("German")
            .number("1")
            .phoneNumber("+40722123456")
            .postalCode("abc123")
            .salutation(Salutation.MR)
            .streetName("Small Street")
            .build();
        IndividualClient individualClient2 = IndividualClient.builder()
            .id(10)
            .dateOfBirth(Date.from(LocalDate.of(1993, 1, 23).atStartOfDay(ZoneId.of("Europe/Bucharest")).toInstant()))
            .apartment("3")
            .building("1")
            .city("Los Angeles")
            .country("United States of America")
            .email("test1@test1.com")
            .firstName("Olivia")
            .lastName("Taylor")
            .floor("0")
            .nationality("British")
            .number("12")
            .phoneNumber("+40721123359")
            .postalCode("bac121")
            .salutation(Salutation.MR)
            .streetName("Large Street")
            .build();
        List<IndividualClient> clientList = List.of(individualClient1, individualClient2);
        when(individualClientsRepository.findAll()).thenReturn(clientList);
        List allClients = individualClientsService.getIndividualClients();
        assertEquals(allClients, clientList);
    }

    @Test
    public void getIndividualByLastNameTest()
    {
        IndividualClient individualClient = IndividualClient.builder()
            .id(23)
            .dateOfBirth(Date.from(LocalDate.of(1973, 11, 18).atStartOfDay(ZoneId.of("Europe/Bucharest")).toInstant()))
            .apartment("23")
            .building("2A")
            .city("Paris")
            .country("France")
            .email("test@test.com")
            .firstName("John")
            .lastName("Doe")
            .floor("2")
            .nationality("German")
            .number("1")
            .phoneNumber("+40722123456")
            .postalCode("abc123")
            .salutation(Salutation.MR)
            .streetName("Small Street")
            .build();
        when(individualClientsRepository.findByLastName(anyString())).thenReturn(Optional.of(List.of(individualClient)));
        List<IndividualClient> clientList =  individualClientsService.getIndividualByLastName("Doe");
        assertEquals(clientList.get(0), individualClient);
    }

    @Test
    public void saveTest()
    {
        IndividualClientDTO individualClientDTO = IndividualClientDTO.builder()
            .id(23)
            .dateOfBirth(Date.from(LocalDate.of(1973, 11, 18).atStartOfDay(ZoneId.of("Europe/Bucharest")).toInstant()))
            .apartment("23")
            .building("2A")
            .city("Paris")
            .country("France")
            .email("test@test.com")
            .firstName("John")
            .lastName("Doe")
            .floor("2")
            .nationality("German")
            .number("1")
            .phoneNumber("+40722123456")
            .postalCode("abc123")
            .salutation(Salutation.MR)
            .streetName("Small Street")
            .build();
        individualClientsService.save(individualClientDTO);
        verify(individualClientsRepository, times(1)).save(any(IndividualClient.class));
    }
}
