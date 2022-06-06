package com.ness.repositories;

import com.ness.entities.IndividualClient;
import com.ness.entities.Organisation;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrganisationsRepository extends CrudRepository<Organisation, Integer> {
    Optional<Organisation> findByTaxId(String taxId);
    @Query(
        value = "SELECT o FROM Organisation o WHERE " +
            "UPPER(o.email) LIKE %:searchString% " +
            "OR UPPER(o.name) LIKE %:searchString% " +
            "OR UPPER(o.phoneNumber) LIKE %:searchString% " +
            "OR UPPER(o.country) LIKE %:searchString% " +
            "OR UPPER(o.city) LIKE %:searchString% " +
            "OR UPPER(o.streetName) LIKE %:searchString% " +
            "OR UPPER(o.number) LIKE %:searchString% " +
            "OR UPPER(o.building) LIKE %:searchString% " +
            "OR UPPER(o.apartment) LIKE %:searchString% " +
            "OR UPPER(o.floor) LIKE %:searchString% "
    )
    Optional<List<Organisation>> findOrgByEmailAddressNamePhone(@Param("searchString") String searchString);
    Optional<Organisation> findById(Integer id);
}
