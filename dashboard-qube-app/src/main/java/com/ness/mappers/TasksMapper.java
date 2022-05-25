package com.ness.mappers;

import com.ness.dtos.TaskDTO;
import com.ness.entities.Task;
import com.ness.entities.User;
import com.ness.misc.UserNotFoundException;
import com.ness.repositories.UserRepository;

public class TasksMapper implements EntityDTOMapper<TaskDTO, Task> {
    private UserRepository userRepository;

    public TasksMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public TaskDTO mapToDTO(Task task) {
        return TaskDTO.builder()
            .id(task.getId())
            .createdByUser(task.getCreatedByUser().getEmail())
            .priority(task.getPriority())
            .dueDate(task.getDueDate())
            .assignedToUser(task.getAssignedToUser().getEmail())
            .description(task.getDescription())
            .title(task.getTitle())
            .status(task.getStatus())
            .build();
    }

    @Override
    public Task mapDTOTo(TaskDTO taskDTO) {
        User createdByUser = userRepository.findByEmail(taskDTO.getCreatedByUser());
        User assignedToUser = userRepository.findByEmail(taskDTO.getAssignedToUser());
        if (createdByUser == null)
            throw new UserNotFoundException("createdByUser not found");
        if(assignedToUser == null)
            throw new UserNotFoundException("assignedToUser not found");
        return Task.builder()
            .id(taskDTO.getId())
            .createdByUser(createdByUser)
            .priority(taskDTO.getPriority())
            .dueDate(taskDTO.getDueDate())
            .assignedToUser(assignedToUser)
            .description(taskDTO.getDescription())
            .title(taskDTO.getTitle())
            .status(taskDTO.getStatus())
            .build();
    }
}
