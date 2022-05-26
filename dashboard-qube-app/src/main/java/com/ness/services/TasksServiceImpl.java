package com.ness.services;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.TaskDTO;
import com.ness.entities.Appointment;
import com.ness.entities.Task;
import com.ness.mappers.EntityDTOMapper;
import com.ness.mappers.TasksMapper;
import com.ness.misc.TaskNotFoundException;
import com.ness.misc.UserNotFoundException;
import com.ness.repositories.TasksRepository;
import com.ness.repositories.UserRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TasksServiceImpl implements TasksService{
    private final TasksRepository tasksRepository;
    private final EntityDTOMapper<TaskDTO, Task> entityDTOMapper;

    public TasksServiceImpl(TasksRepository tasksRepository, UserRepository userRepository) {
        this.tasksRepository = tasksRepository;
        this.entityDTOMapper = new TasksMapper(userRepository);
    }

    @Override
    public List<TaskDTO> getTasksForUser(String email) {
        List<Task> tasks = tasksRepository.findByAssignedToUser_Email(email);
        List<TaskDTO> taskDTOS = new ArrayList<>();
        for(Task task : tasks)
        {
            taskDTOS.add(entityDTOMapper.mapToDTO(task));
        }
        return taskDTOS;
    }
    @Override
    public void save(TaskDTO appointmentDTO) throws TaskNotFoundException {
        Task newTask = entityDTOMapper.mapDTOTo(appointmentDTO);
        tasksRepository.save(newTask);
    }

    @Override
    public void delete(int id) throws EmptyResultDataAccessException {
        tasksRepository.deleteById(id);
    }
}
