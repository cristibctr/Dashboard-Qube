package com.ness.services;

import com.ness.dtos.TaskDTO;

import java.util.List;

public interface TasksService {
    List<TaskDTO> getTasksForUser(String email);
}
