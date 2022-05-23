package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.UserDTO;
import com.ness.entities.Appointment;
import com.ness.misc.UserNotFoundException;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.List;

public interface AppointmentsService {
    void save(AppointmentDTO appointmentDTO) throws UserNotFoundException;
    List<AppointmentDTO> getAppointmentsForUser(String email);
    void delete(int id) throws EmptyResultDataAccessException;
    Appointment getAppointmentById(Integer id);
}
