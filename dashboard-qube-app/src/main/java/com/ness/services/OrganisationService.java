package com.ness.services;

import com.ness.dtos.IndividualClientDTO;
import com.ness.dtos.OrganisationDTO;
import com.ness.entities.IndividualClient;
import com.ness.entities.Organisation;
import com.ness.misc.IndividualClientNotFoundException;
import com.ness.misc.OrganisationNotFoundException;

import java.util.List;
import java.util.Optional;

public interface OrganisationService {
    List<Organisation> getOrganisations();
    OrganisationDTO getOrganisation(Integer Id);
    Organisation getOrganisationByTaxId(String taxId) throws OrganisationNotFoundException;
    Optional<List<OrganisationDTO>> getOrgBySearchString(String searchString);
    void save(OrganisationDTO organisationDTO) throws OrganisationNotFoundException;
}
