package com.ness.repositories;

import com.ness.entities.IndividualClient;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface IndividualClientsRepository extends CrudRepository<IndividualClient, Integer> {

    Optional<List<IndividualClient>> findByLastName(String lastName);
}
