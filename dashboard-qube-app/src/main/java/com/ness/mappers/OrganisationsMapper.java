package com.ness.mappers;


import com.ness.dtos.OrganisationDTO;
import com.ness.entities.Organisation;
import org.springframework.stereotype.Component;

@Component
public class OrganisationsMapper implements EntityDTOMapper<OrganisationDTO, Organisation>{
    @Override
    public OrganisationDTO mapToDTO(Organisation organisation) {
        return OrganisationDTO.builder()
            .id(organisation.getId())
            .organisationType(organisation.getOrganisationType())
            .name(organisation.getName())
            .contactName(organisation.getContactName())
            .taxId(organisation.getTaxId())
            .streetName(organisation.getStreetName())
            .number(organisation.getNumber())
            .apartment(organisation.getApartment())
            .building(organisation.getBuilding())
            .floor(organisation.getFloor())
            .postalCode(organisation.getPostalCode())
            .city(organisation.getCity())
            .country(organisation.getCountry())
            .email(organisation.getEmail())
            .phoneNumber(organisation.getPhoneNumber())
            .build();
    }

    @Override
    public Organisation mapDTOTo(OrganisationDTO organisationDTO) {
        return Organisation
            .builder()
            .id(organisationDTO.getId())
            .organisationType(organisationDTO.getOrganisationType())
            .name(organisationDTO.getName())
            .contactName(organisationDTO.getContactName())
            .taxId(organisationDTO.getTaxId())
            .streetName(organisationDTO.getStreetName())
            .number(organisationDTO.getNumber())
            .apartment(organisationDTO.getApartment())
            .building(organisationDTO.getBuilding())
            .floor(organisationDTO.getFloor())
            .postalCode(organisationDTO.getPostalCode())
            .city(organisationDTO.getCity())
            .country(organisationDTO.getCountry())
            .email(organisationDTO.getEmail())
            .phoneNumber(organisationDTO.getPhoneNumber())
            .build();
    }
}
