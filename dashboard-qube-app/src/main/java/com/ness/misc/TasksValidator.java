package com.ness.misc;

import com.ness.dtos.AppointmentDTO;
import com.ness.dtos.TaskDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TasksValidator {
    public static boolean validate(TaskDTO task){
        boolean titleValidation = validateTitle(task.getTitle());
        boolean dueDateValidation = validateDueDate(task.getDueDate());
        boolean descriptionValidation = validateDescription(task.getDescription());
        boolean priorityValidation = validatePriority(task.getPriority());
        boolean usersValidation = validateUsers(task.getCreatedByUser(), task.getAssignedToUser());
        boolean doneValidation = validateDone(task.getDone());

        return titleValidation &
            dueDateValidation &
            descriptionValidation &
            priorityValidation &
            usersValidation &
            doneValidation
            ;

    }

    public static boolean validateOldTask(TaskDTO task){
        boolean titleValidation = validateTitle(task.getTitle());
        boolean descriptionValidation = validateDescription(task.getDescription());
        boolean priorityValidation = validatePriority(task.getPriority());
        boolean usersValidation = validateUsers(task.getCreatedByUser(), task.getAssignedToUser());
        boolean doneValidation = validateDone(task.getDone());

        return titleValidation &
            descriptionValidation &
            priorityValidation &
            usersValidation &
            doneValidation
            ;

    }

    private static boolean validateUsers(String createdByUser, String assignedToUser) {
        if(createdByUser == null || assignedToUser == null ||
            createdByUser.length() == 0 || createdByUser.length() == 0)
            return false;

        return true;
    }



    private static boolean validateTitle(String title)
    {
        if(title == null)
            return false;
        if(title.length() < 2 || title.length() > 60)
            return false;

        Pattern pattern = Pattern.compile("^([\\S]+[\\s-])*[\\S)]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(title);
        if(!matcher.matches()){
            return false;
        }
        return true;
    }

    private static boolean validateDueDate(LocalDateTime dueDate)
    {
        if(dueDate == null)
            return false;
        if(dueDate.isBefore(LocalDateTime.now()))
            return false;
        return true;
    }


    private static boolean validateDescription(String description)
    {
        if (description == null)
            return true;
        return description.length() < 500;
    }

    private static boolean validatePriority(String priority)
    {
        if(priority == null)
            return false;
        List<String> priorityArray = new ArrayList<>(
            Arrays.asList(
                "high",
                "medium",
                "low"
            ));
        return priorityArray.contains(priority.toLowerCase());
    }

    private static boolean validateDone(Boolean done){
        if(done == null){
            return false;
        }
       return true;

    }
}
