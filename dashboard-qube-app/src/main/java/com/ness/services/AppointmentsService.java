package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.UserDTO;
import com.ness.entities.Appointment;
import com.ness.misc.UserNotFoundException;

import java.util.List;

public interface AppointmentsService {
    void save(AppointmentDTO appointmentDTO) throws UserNotFoundException;
    List<AppointmentDTO> getAppointmentsForUser(String email);
    void delete(AppointmentDTO appointmentDTO) throws UserNotFoundException;
    void edit(AppointmentDTO appointmentDTO) throws UserNotFoundException;

    Appointment getAppointmentById(Integer id);
}
