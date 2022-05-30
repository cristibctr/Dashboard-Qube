package com.ness.mappers;

import com.ness.dtos.IndividualClientDTO;
import com.ness.entities.IndividualClient;
import org.springframework.stereotype.Component;

@Component
public class IndividualClientsMapper implements EntityDTOMapper<IndividualClientDTO, IndividualClient>{
    @Override
    public IndividualClientDTO mapToDTO(IndividualClient o) {
        return IndividualClientDTO
            .builder()
            .id(o.getId())
            .salutation(o.getSalutation())
            .firstName(o.getFirstName())
            .lastName(o.getLastName())
            .dateOfBirth(o.getDateOfBirth())
            .nationality(o.getNationality())
            .streetName(o.getStreetName())
            .number(o.getNumber())
            .companyName(o.getCompanyName())
            .apartment(o.getApartment())
            .suite(o.getSuite())
            .unit(o.getUnit())
            .building(o.getBuilding())
            .floor(o.getFloor())
            .postalCode(o.getPostalCode())
            .city(o.getCity())
            .country(o.getCountry())
            .email(o.getEmail())
            .phoneNumber(o.getPhoneNumber())
            .build();
    }

    @Override
    public IndividualClient mapDTOTo(IndividualClientDTO o) {
        return IndividualClient
            .builder()
            .id(o.getId())
            .salutation(o.getSalutation())
            .firstName(o.getFirstName())
            .lastName(o.getLastName())
            .dateOfBirth(o.getDateOfBirth())
            .nationality(o.getNationality())
            .streetName(o.getStreetName())
            .number(o.getNumber())
            .companyName(o.getCompanyName())
            .apartment(o.getApartment())
            .suite(o.getSuite())
            .unit(o.getUnit())
            .building(o.getBuilding())
            .floor(o.getFloor())
            .postalCode(o.getPostalCode())
            .city(o.getCity())
            .country(o.getCountry())
            .email(o.getEmail())
            .phoneNumber(o.getPhoneNumber())
            .build();
    }
}
