package com.ness.controllers;


import com.ness.dtos.IndividualClientDTO;
import com.ness.dtos.OrganisationDTO;
import com.ness.entities.Organisation;
import com.ness.mappers.OrganisationsMapper;
import com.ness.misc.OrganisationEmailUniqueException;
import com.ness.misc.OrganisationsValidator;
import com.ness.services.OrganisationService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class OrganisationsController {

    private final OrganisationService organisationService;

    private OrganisationsMapper organisationsMapper;

    public OrganisationsController(OrganisationService organisationService) {
        this.organisationService = organisationService;
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path="/api/organisations", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<List<OrganisationDTO>> getAllClients(){

        return ResponseEntity.status(200).body(organisationService.getOrganisations().stream().map(organisation -> organisationsMapper.mapToDTO(organisation)).collect(Collectors.toList()));
    }


    @CrossOrigin(origins = "*")
    @PostMapping(path="/api/organisations", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> save(@RequestBody OrganisationDTO organisationDTO) {
        if(!OrganisationsValidator.validate(organisationDTO))
        {
            return ResponseEntity.status(404).body("Incorrect request data");
        }
        Organisation existentOrganisation =
            organisationService.getOrganisationByTaxId(organisationDTO.getTaxId());
        if(existentOrganisation != null){
            return ResponseEntity.status(409).body("Organisation taxid already exists");
        }

        try{
            Integer userId = organisationService.save(organisationDTO);
            return ResponseEntity.status(200).body(userId.toString());
        }
        catch(OrganisationEmailUniqueException e){
            return ResponseEntity.status(409).body("Organisation email already exists");
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path="/api/organisations/search", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<OrganisationDTO>> searchClient(@RequestParam String searchString)
    {
        Optional<List<OrganisationDTO>> orgDTOList = organisationService.getOrgBySearchString(searchString.toUpperCase().trim());
        return ResponseEntity.status(200).body(orgDTOList.isPresent() ? orgDTOList.get() : new ArrayList<OrganisationDTO>());
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path="/api/organisations/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<OrganisationDTO> searchClient(@PathVariable Integer id)
    {
        OrganisationDTO orgDTO = organisationService.getOrganisation(id);
        if(orgDTO == null)
            return ResponseEntity.status(404).body(null);
        return ResponseEntity.status(200).body(orgDTO);
    }
}
