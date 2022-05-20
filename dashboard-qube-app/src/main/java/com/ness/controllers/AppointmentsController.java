package com.ness.controllers;

import com.ness.dtos.AppointmentDTO;
import com.ness.entities.Appointment;
import com.ness.misc.AppointmentsValidator;
import com.ness.misc.UserNotFoundException;
import com.ness.services.AppointmentsService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @CrossOrigin(origins = "*")
    @DeleteMapping(path="/api/appointment", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> deleteAppointment(@RequestBody AppointmentDTO appointmentDTO){
        if(!AppointmentsValidator.validateOldAppointment(appointmentDTO))
        {
            return ResponseEntity.status(404).body("Incorrect request data");
        }
        appointmentsService.delete(appointmentDTO);
        return ResponseEntity.status(200).body("Appointment deleted");
    }
    @CrossOrigin(origins = "*")
    @PatchMapping(path="/api/appointment", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> editAppointment(@RequestBody AppointmentDTO appointmentDTO){

        if(!AppointmentsValidator.validateOldAppointment(appointmentDTO))
            {
                return ResponseEntity.status(404).body("Incorrect request data");
            }

        appointmentsService.save(appointmentDTO);
        return ResponseEntity.status(200).body("Appointment edited");
        }



}
