package com.ness.repositories;

import com.ness.entities.Country;
import com.ness.entities.RomanianCity;
import org.springframework.data.repository.CrudRepository;

public interface RomanianCitiesRepository extends CrudRepository<RomanianCity, Integer> {
}
