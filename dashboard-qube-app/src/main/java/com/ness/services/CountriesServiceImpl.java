package com.ness.services;

import com.ness.entities.Country;
import com.ness.repositories.CountriesRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class CountriesServiceImpl implements CountriesService{

    private final CountriesRepository countriesRepository;

    public CountriesServiceImpl(CountriesRepository countriesRepository) {
        this.countriesRepository = countriesRepository;
    }

    @Override
    public Set<Country> getCountries() {
        Set<Country> countrySet = new HashSet<>();
        countriesRepository.findAll().forEach(country -> {
            countrySet.add(country);
        });
        return countrySet;
    }
}
