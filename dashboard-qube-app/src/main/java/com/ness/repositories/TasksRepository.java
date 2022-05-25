package com.ness.repositories;

import com.ness.entities.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TasksRepository extends CrudRepository<Task, Integer> {
    List<Task> findByAssignedToUser_Email(String email);
}
