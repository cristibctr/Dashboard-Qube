package com.ness.services;


import com.ness.dtos.IndividualClientDTO;
import com.ness.entities.IndividualClient;
import com.ness.misc.IndividualClientNotFoundException;

import java.util.List;
import java.util.Optional;

public interface IndividualClientsService {
    List<IndividualClient> getIndividualClients();
    IndividualClientDTO getIndividualClient(Integer id);
    List<IndividualClient> getIndividualByLastName(String lastName);
    Optional<List<IndividualClientDTO>> getClientsBySearchString(String searchString);
    Integer save(IndividualClientDTO individualClientDTO) throws IndividualClientNotFoundException;
}
