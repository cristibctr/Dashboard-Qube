package com.ness.repositories;

import com.ness.entities.Appointment;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentsRepository extends CrudRepository<Appointment, Integer> {
    List<Appointment> findByCreatedByUser_Email(String email);
    List<Appointment> findByAssignedToUser_Email(String email);
}
