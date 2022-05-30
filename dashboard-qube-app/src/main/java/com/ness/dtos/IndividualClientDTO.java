package com.ness.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ness.misc.Salutation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Date;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class IndividualClientDTO {

    private Integer id;

    private Salutation salutation;

    private String firstName;

    private String lastName;

    private Date dateOfBirth;

    private String nationality;

    private String streetName;

    private String number;

    private String companyName;

    private String apartment;

    private String suite;

    private String unit;

    private String building;

    private String floor;

    private String postalCode;

    private String city;

    private String country;

    private String email;

    private String phoneNumber;
}
