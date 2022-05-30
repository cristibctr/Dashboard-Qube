package com.ness.controllers;

import com.ness.dtos.IndividualClientDTO;
import com.ness.entities.IndividualClient;
import com.ness.mappers.IndividualClientsMapper;
import com.ness.misc.IndividualClientsValidator;
import com.ness.services.IndividualClientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class IndividualClientsController {

    private IndividualClientsMapper individualClientsMapper;

    private final IndividualClientsService individualClientsService;

    public IndividualClientsController(IndividualClientsService individualClientsService) {
        this.individualClientsService = individualClientsService;
    }


    @CrossOrigin(origins = "*")
    @GetMapping(path="/api/clients", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<List<IndividualClientDTO>> getAllClients(){

        return ResponseEntity.status(200).body(individualClientsService.getIndividualClients().stream().map(individualClient -> individualClientsMapper.mapToDTO(individualClient)).collect(Collectors.toList()));
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/api/clients", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> save(@RequestBody IndividualClientDTO individualClientDTO){
        if(!IndividualClientsValidator.validate(individualClientDTO))
        {
            return ResponseEntity.status(404).body("Incorrect request data");
        }
        List<IndividualClient> existentClients =
            individualClientsService.getIndividualByLastName(individualClientDTO.getLastName());



        if(existentClients != null){
            boolean clientAlreadyExists = false;

            for (IndividualClient client: existentClients) {
                if(client.getFirstName().equals(individualClientDTO.getFirstName()) && client.getDateOfBirth().equals(individualClientDTO.getDateOfBirth())){
                    clientAlreadyExists = true;
                    break;
                }
            }
            if(clientAlreadyExists){
                return ResponseEntity.status(204).body("Individual Client already exists");
            }

        }
        individualClientsService.save(individualClientDTO);

        return ResponseEntity.status(200).body("Individual Client created");
    }



}