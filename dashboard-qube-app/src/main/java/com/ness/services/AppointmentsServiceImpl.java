package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.entities.Appointment;
import com.ness.mappers.AppointmentsMapper;
import com.ness.mappers.EntityDTOMapper;
import com.ness.misc.UserNotFoundException;
import com.ness.repositories.AppointmentsRepository;
import com.ness.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AppointmentsServiceImpl implements AppointmentsService {

    private final AppointmentsRepository appointmentsRepository;
    private final EntityDTOMapper<AppointmentDTO, Appointment> entityDTOMapper;

    public AppointmentsServiceImpl(AppointmentsRepository appointmentsRepository, UserRepository userRepository) {
        this.appointmentsRepository = appointmentsRepository;
        this.entityDTOMapper = new AppointmentsMapper(userRepository);
    }

    @Override
    public void save(AppointmentDTO appointmentDTO) throws UserNotFoundException {
        Appointment newAppointment = entityDTOMapper.mapDTOTo(appointmentDTO);
        appointmentsRepository.save(newAppointment);
    }
}
