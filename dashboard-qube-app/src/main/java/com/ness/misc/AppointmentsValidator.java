package com.ness.misc;

import com.ness.dtos.AppointmentDTO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

public class AppointmentsValidator {
    public static boolean validate(AppointmentDTO appointment){
        boolean titleValidation = validateTitle(appointment.getTitle());
        boolean startDateValidation = validateStartDate(appointment.getStartDate());
        boolean descriptionValidation = validateDescription(appointment.getDescription());
        boolean contactTypesValidation = validateContactType(appointment.getContactType());
        boolean usersValidation = validateUsers(appointment.getCreatedByUser(), appointment.getAssignedToUser());

        return titleValidation &
            startDateValidation &
            descriptionValidation &
            contactTypesValidation &
            usersValidation
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
        return true;
    }

    private static boolean validateStartDate(LocalDateTime startDate)
    {
        if(startDate == null)
            return false;
        if(startDate.isBefore(LocalDateTime.now()))
            return false;
        return true;
    }

    private static boolean validateDescription(String description)
    {
        if (description == null)
            return true;
        return description.length() < 500;
    }

    private static boolean validateContactType(String contactType)
    {
        if(contactType == null)
            return false;
        List<String> contactTypeArray = new ArrayList<>(
            Arrays.asList(
            "online meeting",
            "showroom meeting",
            "client's office meeting",
            "phone",
            "email",
            "sms"
        ));
        return contactTypeArray.contains(contactType.toLowerCase());
    }
}
