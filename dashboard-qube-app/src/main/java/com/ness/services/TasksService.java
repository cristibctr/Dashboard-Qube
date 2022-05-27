package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.TaskDTO;
import com.ness.misc.TaskNotFoundException;
import org.springframework.dao.EmptyResultDataAccessException;

import java.util.List;

public interface TasksService {
    List<TaskDTO> getTasksForUser(String email);
    void save(TaskDTO taskDTO) throws TaskNotFoundException;
    void delete(int id) throws EmptyResultDataAccessException;;
}
