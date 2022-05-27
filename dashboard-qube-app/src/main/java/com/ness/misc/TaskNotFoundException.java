package com.ness.misc;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(String task_not_found) {
        super(task_not_found);
    }
}
