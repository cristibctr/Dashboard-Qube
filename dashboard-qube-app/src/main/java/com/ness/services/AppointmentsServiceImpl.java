package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.UserDTO;
import com.ness.entities.Appointment;
import com.ness.mappers.AppointmentsMapper;
import com.ness.mappers.EntityDTOMapper;
import com.ness.misc.UserNotFoundException;
import com.ness.repositories.AppointmentsRepository;
import com.ness.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public List<AppointmentDTO> getAppointmentsForUser(String email) {
        List<Appointment> appointments = appointmentsRepository.findByAssignedToUser_Email(email);
        List<AppointmentDTO> appointmentDTOS = new ArrayList<>();
        for(Appointment appointment : appointments)
        {
            appointmentDTOS.add(entityDTOMapper.mapToDTO(appointment));
        }
        return appointmentDTOS;
    }
}
