package com.ness.services;

import com.ness.dtos.OrganisationDTO;
import com.ness.entities.Organisation;
import com.ness.mappers.EntityDTOMapper;
import com.ness.misc.OrganisationNotFoundException;
import com.ness.repositories.OrganisationsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrganisationServiceImpl implements OrganisationService{
    
    private final OrganisationsRepository organisationsRepository;
    private final EntityDTOMapper<OrganisationDTO, Organisation> entityDTOMapper;

    public OrganisationServiceImpl(OrganisationsRepository organisationsRepository, EntityDTOMapper<OrganisationDTO, Organisation> entityDTOMapper) {
        this.organisationsRepository = organisationsRepository;
        this.entityDTOMapper = entityDTOMapper;
    }

    @Override
    public List<Organisation> getOrganisations() {
        List<Organisation> organisationsSet = new ArrayList<>();
        organisationsRepository.findAll().forEach(organisation -> {
            organisationsSet.add(organisation);
        });
        return organisationsSet;
    }

    @Override
    public List<Organisation> getOrganisationsByTaxId(String taxId) {
        return null;
    }

    @Override
    public void save(OrganisationDTO organisationDTO) throws OrganisationNotFoundException {
        this.organisationsRepository.save(entityDTOMapper.mapDTOTo(organisationDTO));
    }
}
