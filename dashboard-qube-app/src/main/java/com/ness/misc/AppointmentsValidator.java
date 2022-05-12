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
        boolean endDateValidation = validateEndDate(appointment.getEndDate());
        boolean startEndDateValidation = validateStartEndDate(appointment.getStartDate(), appointment.getEndDate());
        boolean descriptionValidation = validateDescription(appointment.getDescription());
        boolean contactTypesValidation = validateContactType(appointment.getContactType());

        return titleValidation &
            startDateValidation &
            endDateValidation &
            startEndDateValidation &
            descriptionValidation &
            contactTypesValidation
            ;

    }

    private static boolean validateStartEndDate(LocalDateTime startDate, LocalDateTime endDate) {
            return startDate.isBefore(endDate);
    }

    private static boolean validateTitle(String title)
    {
        if(title.length() < 2 || title.length() > 60)
            return false;
        if(title == null)
            return false;
        return true;
    }

    private static boolean validateStartDate(LocalDateTime startDate)
    {
        if(startDate.isBefore(LocalDateTime.now()))
            return false;
        return true;
    }

    private static boolean validateEndDate(LocalDateTime startDate)
    {
        if(startDate.isBefore(LocalDateTime.now()))
            return false;
        return true;
    }

    private static boolean validateDescription(String description)
    {
        return description.length() < 500;
    }

    private static boolean validateContactType(String contactType)
    {
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
