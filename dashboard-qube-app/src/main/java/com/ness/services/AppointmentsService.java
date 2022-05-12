package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.misc.UserNotFoundException;

public interface AppointmentsService {
    void save(AppointmentDTO appointmentDTO) throws UserNotFoundException;
}
