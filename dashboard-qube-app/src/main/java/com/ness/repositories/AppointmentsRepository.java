package com.ness.repositories;

import com.ness.entities.Appointment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentsRepository extends CrudRepository<Appointment, Integer> {
    Appointment findByCreatedByUser_Email(String email);
    Appointment findByAssignedToUser_Email(String email);
}
