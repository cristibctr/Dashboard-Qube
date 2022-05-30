package com.ness.services;

import com.ness.entities.RomanianCity;
import com.ness.repositories.RomanianCitiesRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class RomanianCitiesServiceImpl implements  RomanianCitiesService{

    private final RomanianCitiesRepository romanianCitiesRepository;

    public RomanianCitiesServiceImpl(RomanianCitiesRepository romanianCitiesRepository) {
        this.romanianCitiesRepository = romanianCitiesRepository;
    }


    @Override
    public Set<RomanianCity> getCities() {
        Set<RomanianCity> citySet = new HashSet<>();
        romanianCitiesRepository.findAll().forEach(city -> {
            citySet.add(city);
        });
        return citySet;
    }
}
