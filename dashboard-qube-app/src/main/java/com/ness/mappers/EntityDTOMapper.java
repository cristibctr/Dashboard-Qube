package com.ness.mappers;

import com.ness.dtos.AppointmentDTO;
import com.ness.entities.Appointment;
import com.ness.misc.UserNotFoundException;

public interface EntityDTOMapper<S, T> {
    public S mapToDTO(T t);
    public T mapDTOTo(S s);
}
