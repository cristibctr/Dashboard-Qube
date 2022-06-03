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
            "UPPER(i.email) LIKE %:searchString% " +
            "OR UPPER(i.firstName) LIKE %:searchString% " +
            "OR UPPER(i.phoneNumber) LIKE %:searchString% " +
            "OR UPPER(i.lastName) LIKE %:searchString% " +
            "OR UPPER(i.country) LIKE %:searchString% " +
            "OR UPPER(i.city) LIKE %:searchString% " +
            "OR UPPER(i.streetName) LIKE %:searchString% " +
            "OR UPPER(i.number) LIKE %:searchString% " +
            "OR UPPER(i.building) LIKE %:searchString% " +
            "OR UPPER(i.apartment) LIKE %:searchString% " +
            "OR UPPER(i.floor) LIKE %:searchString% "
    )
    Optional<List<IndividualClient>> findClientByEmailAddressNamePhone(@Param("searchString") String searchString);
    Optional<IndividualClient> findById(Integer Id);
}
