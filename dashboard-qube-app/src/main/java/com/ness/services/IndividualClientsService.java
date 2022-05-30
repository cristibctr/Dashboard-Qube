package com.ness.services;


import com.ness.dtos.IndividualClientDTO;
import com.ness.entities.IndividualClient;
import com.ness.misc.IndividualClientNotFoundException;

import java.util.List;

public interface IndividualClientsService {
    List<IndividualClient> getIndividualClients();
    List<IndividualClient> getIndividualByLastName(String lastName);
    void save(IndividualClientDTO individualClientDTO) throws IndividualClientNotFoundException;
}
