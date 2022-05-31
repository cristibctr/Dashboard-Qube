package com.ness.controllers;

import com.ness.services.OrganisationService;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrganisationsController {

    private final OrganisationService organisationService;

    public OrganisationsController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

}
