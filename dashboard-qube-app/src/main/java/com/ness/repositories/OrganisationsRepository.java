package com.ness.repositories;

import com.ness.entities.Organisation;
import org.springframework.data.repository.CrudRepository;

public interface OrganisationsRepository extends CrudRepository<Organisation, Integer> {
}
