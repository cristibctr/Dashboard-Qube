package com.ness.repositories;

import com.ness.entities.IndividualClient;
import com.ness.entities.Organisation;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface OrganisationsRepository extends CrudRepository<Organisation, Integer> {
    Optional<Organisation> findByTaxId(String taxId);
}
