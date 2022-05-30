package com.ness.misc;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class IndividualClientNotFoundException extends RuntimeException{
    public IndividualClientNotFoundException(String individual_client_not_found) {
        super(individual_client_not_found);
    }
}
