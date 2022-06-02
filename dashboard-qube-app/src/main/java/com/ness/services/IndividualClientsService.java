package com.ness.services;


import com.ness.dtos.IndividualClientDTO;
import com.ness.entities.IndividualClient;
import com.ness.misc.IndividualClientNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IndividualClientsService {
    List<IndividualClient> getIndividualClients();
    List<IndividualClient> getIndividualByLastName(String lastName);
    Optional<List<IndividualClientDTO>> getClientsBySearchString(String searchString);
    void save(IndividualClientDTO individualClientDTO) throws IndividualClientNotFoundException;
}
