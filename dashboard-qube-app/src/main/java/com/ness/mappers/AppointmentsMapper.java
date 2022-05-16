package com.ness.mappers;

import com.ness.dtos.AppointmentDTO;
import com.ness.entities.Appointment;
import com.ness.entities.User;
import com.ness.misc.UserNotFoundException;
import com.ness.repositories.UserRepository;

public class AppointmentsMapper implements EntityDTOMapper<AppointmentDTO, Appointment>{

    UserRepository userRepository;

    public AppointmentsMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Appointment mapDTOTo(AppointmentDTO appointmentDTO) throws UserNotFoundException{
        User createdByUser = userRepository.findByEmail(appointmentDTO.getCreatedByUser());
        User assignedToUser = userRepository.findByEmail(appointmentDTO.getAssignedToUser());
        if (createdByUser == null)
            throw new UserNotFoundException("createdByUser not found");
        if(assignedToUser == null)
            throw new UserNotFoundException("assignedToUser not found");
        return Appointment.builder()
            .createdByUser(createdByUser)
            .contactType(appointmentDTO.getContactType())
            .startDate(appointmentDTO.getStartDate())
            .endDate(appointmentDTO.getEndDate())
            .assignedToUser(assignedToUser)
            .description(appointmentDTO.getDescription())
            .title(appointmentDTO.getTitle())
            .build();
    }

    @Override
    public AppointmentDTO mapToDTO(Appointment appointment) {
        return AppointmentDTO.builder()
            .createdByUser(appointment.getCreatedByUser().getEmail())
            .contactType(appointment.getContactType())
            .startDate(appointment.getStartDate())
            .endDate(appointment.getEndDate())
            .assignedToUser(appointment.getAssignedToUser().getEmail())
            .description(appointment.getDescription())
            .title(appointment.getTitle())
            .build();
    }
}
