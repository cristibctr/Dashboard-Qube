package com.ness.repositories;


import com.ness.entities.Country;
import org.springframework.data.repository.CrudRepository;

public interface CountriesRepository extends CrudRepository<Country, Integer> {
}
