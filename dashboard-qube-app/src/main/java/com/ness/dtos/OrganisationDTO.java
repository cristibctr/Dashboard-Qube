package com.ness.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import javax.persistence.Column;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class OrganisationDTO {
    private Integer id;

    private String organisationType;

    private String name;

    private String contactName;

    private String taxId;

    private String streetName;

    private String number;

    private String apartment;

    private String building;

    private String floor;

    private String postalCode;

    private String city;

    private String country;

    private String email;

    private String phoneNumber;
}
