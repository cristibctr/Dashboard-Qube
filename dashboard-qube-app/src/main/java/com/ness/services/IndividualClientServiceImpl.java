package com.ness.services;

import com.ness.dtos.IndividualClientDTO;
import com.ness.entities.IndividualClient;
import com.ness.mappers.EntityDTOMapper;
import com.ness.misc.IndividualClientNotFoundException;
import com.ness.repositories.IndividualClientsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IndividualClientServiceImpl implements IndividualClientsService{

    private final IndividualClientsRepository individualClientsRepository;
    private final EntityDTOMapper<IndividualClientDTO, IndividualClient> entityDTOMapper;

    public IndividualClientServiceImpl(IndividualClientsRepository individualClientsRepository, EntityDTOMapper<IndividualClientDTO, IndividualClient> entityDTOMapper) {
        this.individualClientsRepository = individualClientsRepository;
        this.entityDTOMapper = entityDTOMapper;
    }

    @Override
    public List<IndividualClient> getIndividualClients() {
        List<IndividualClient> individualClientsSet = new ArrayList<>();
        individualClientsRepository.findAll().forEach(individualClient -> {
            individualClientsSet.add(individualClient);
        });
        return individualClientsSet;
    }

    @Override
    public List<IndividualClient> getIndividualByLastName(String lastName) {
        Optional<List<IndividualClient>> client = individualClientsRepository.findByLastName(lastName);

        if(client.isPresent()){
            return client.get();
        }
        return null;
    }

    @Override
    public Optional<List<IndividualClientDTO>> getClientsBySearchString(String searchString) {
        Optional<List<IndividualClient>> individualClientsList = individualClientsRepository.findClientByEmailAddressNamePhone(searchString);
        return Optional.ofNullable(individualClientsList.map(individualClients -> individualClients.stream().map(entityDTOMapper::mapToDTO).collect(Collectors.toList())).orElse(null));
    }


    @Override
    public void save(IndividualClientDTO individualClientDTO) throws IndividualClientNotFoundException {
        this.individualClientsRepository.save(entityDTOMapper.mapDTOTo(individualClientDTO));
    }
}
