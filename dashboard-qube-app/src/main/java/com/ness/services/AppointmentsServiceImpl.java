package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.entities.Appointment;
import com.ness.mappers.AppointmentsMapper;
import com.ness.misc.UserNotFoundException;
import com.ness.repositories.AppointmentsRepository;
import com.ness.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AppointmentsServiceImpl implements AppointmentsService {
    private AppointmentsRepository appointmentsRepository;
    private UserRepository userRepository;

    public AppointmentsServiceImpl(AppointmentsRepository appointmentsRepository, UserRepository userRepository) {
        this.appointmentsRepository = appointmentsRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void save(AppointmentDTO appointmentDTO) throws UserNotFoundException {
        AppointmentsMapper appointmentsMapper = new AppointmentsMapper(userRepository);
        Appointment newAppointment = appointmentsMapper.mapAppointmentsDTOToAppointments(appointmentDTO);
        appointmentsRepository.save(newAppointment);
    }
}
