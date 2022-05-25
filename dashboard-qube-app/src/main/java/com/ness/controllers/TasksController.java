package com.ness.controllers;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.TaskDTO;
import com.ness.services.TasksService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
}
