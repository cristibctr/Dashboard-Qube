package com.ness.controllers;

import com.ness.dtos.AppointmentDTO;
import com.ness.misc.AppointmentsValidator;
import com.ness.misc.UserNotFoundException;
import com.ness.services.AppointmentsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppointmentsController {

    private final AppointmentsService appointmentsService;

    public AppointmentsController(AppointmentsService appointmentsService) {
        this.appointmentsService = appointmentsService;
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/api/appointments", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> save(@RequestBody AppointmentDTO appointmentDTO){
        if(!AppointmentsValidator.validate(appointmentDTO))
        {
            return ResponseEntity.status(404).body("Incorrect request data");
        }
        appointmentsService.save(appointmentDTO);
        return ResponseEntity.status(200).body("Appointment created");
    }
}
