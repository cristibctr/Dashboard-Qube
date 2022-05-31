package com.ness.misc;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class OrganisationNotFoundException extends RuntimeException{
    public OrganisationNotFoundException(String organisation_not_found) {
        super(organisation_not_found);
    }
}
