package com.ness.services;

import com.ness.dtos.IndividualClientDTO;
import com.ness.dtos.OrganisationDTO;
import com.ness.entities.IndividualClient;
import com.ness.entities.Organisation;
import com.ness.misc.IndividualClientNotFoundException;
import com.ness.misc.OrganisationNotFoundException;

import java.util.List;

public interface OrganisationService {
    List<Organisation> getOrganisations();
    List<Organisation> getOrganisationsByTaxId(String taxId);
    void save(OrganisationDTO organisationDTO) throws OrganisationNotFoundException;
}
