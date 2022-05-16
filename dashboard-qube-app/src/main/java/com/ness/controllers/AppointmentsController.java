package com.ness.controllers;

import com.ness.dtos.AppointmentDTO;
import com.ness.misc.AppointmentsValidator;
import com.ness.misc.UserNotFoundException;
import com.ness.services.AppointmentsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @CrossOrigin(origins = "*")
    @GetMapping(path="/api/appointments", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsForUser(@RequestParam String email){
        return ResponseEntity.status(200).body(appointmentsService.getAppointmentsForUser(email));
    }
}
