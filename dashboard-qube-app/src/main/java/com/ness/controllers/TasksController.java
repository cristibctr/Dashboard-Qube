package com.ness.controllers;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.TaskDTO;
import com.ness.misc.AppointmentsValidator;
import com.ness.misc.TasksValidator;
import com.ness.services.TasksService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TasksController {
    TasksService tasksService;

    public TasksController(TasksService tasksService) {
        this.tasksService = tasksService;
    }

    @CrossOrigin(origins = "*")
    @GetMapping(path="/api/tasks", produces= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TaskDTO>> getTasksForUser(@RequestParam String email){
        return ResponseEntity.status(200).body(tasksService.getTasksForUser(email));
    }

    @CrossOrigin(origins = "*")
    @PostMapping(path="/api/tasks", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> save(@RequestBody TaskDTO taskDTO){
        if(!TasksValidator.validate(taskDTO))
        {
            return ResponseEntity.status(404).body("Incorrect request data");
        }
        tasksService.save(taskDTO);
        return ResponseEntity.status(200).body("Task created");
    }
    @CrossOrigin(origins = "*")
    @DeleteMapping(path="/api/tasks/{id}", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> deleteTask(@PathVariable int id){
        try{
            tasksService.delete(id);
        }catch(EmptyResultDataAccessException e){
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.status(200).body("Task deleted");
    }
    @CrossOrigin(origins = "*")
    @PatchMapping(path="/api/task", produces= MediaType.TEXT_PLAIN_VALUE)
    public ResponseEntity<String> editTask(@RequestBody TaskDTO taskDTO){

        if(!TasksValidator.validateOldAppointment(taskDTO))
        {
            return ResponseEntity.status(404).body("Incorrect request data");
        }

        tasksService.save(taskDTO);
        return ResponseEntity.status(200).body("Task edited");
    }


}
