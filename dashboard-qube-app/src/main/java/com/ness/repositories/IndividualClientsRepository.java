package com.ness.repositories;

import com.ness.entities.IndividualClient;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IndividualClientsRepository extends CrudRepository<IndividualClient, Integer> {

    Optional<List<IndividualClient>> findByLastName(String lastName);
    @Query(
        value = "SELECT i FROM IndividualClient i WHERE " +
            "i.email LIKE %:searchString% " +
            "OR i.firstName LIKE %:searchString% " +
            "OR i.phoneNumber LIKE %:searchString% " +
            "OR i.lastName LIKE %:searchString% " +
            "OR i.country LIKE %:searchString% " +
            "OR i.city LIKE %:searchString% " +
            "OR i.streetName LIKE %:searchString% " +
            "OR i.number LIKE %:searchString% " +
            "OR i.building LIKE %:searchString% " +
            "OR i.apartment LIKE %:searchString% " +
            "OR i.floor LIKE %:searchString% "
    )
    Optional<List<IndividualClient>> findClientByEmailAddressNamePhone(@Param("searchString") String searchString);
}
