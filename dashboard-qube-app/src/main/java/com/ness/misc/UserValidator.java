package com.ness.misc;

import com.ness.dtos.UserDTO;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserValidator {
    public static boolean validate(UserDTO user)
    {
        boolean emailValidation = validateEmail(user.getEmail());
        boolean dateOfBirthValidation = validateDateOfBirth(user.getDateOfBirth());
        boolean firstNameValidation = validateFirstName(user.getFirstName());
        boolean lastNameValidation = validateLastName(user.getLastName());
        boolean phoneNumberValidation = validatePhoneNumber(user.getPhoneNumber());
        boolean cityValidation = validateCity(user.getCity());
        boolean countryValidation = validateCountry(user.getCountry());
        return emailValidation &
            dateOfBirthValidation &
            firstNameValidation &
            lastNameValidation &
            phoneNumberValidation &
            cityValidation &
            countryValidation
            ;
    }

    private static boolean validateCountry(String country) {
        if(country == null || country.length() == 0)
            return true;
        Pattern pattern = Pattern.compile("^([a-zA-Z]+[\\s-])*[a-zA-Z]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(country);
        return country.length() >= 2 && country.length() <= 25 && matcher.matches();
    }

    private static boolean validateCity(String city) {
        if(city == null || city.length() == 0)
            return true;
        Pattern pattern = Pattern.compile("^([a-zA-Z]+[\\s-])*[a-zA-Z]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(city);
        return city.length() >= 2 && city.length() <= 25 && matcher.matches();
    }

    private static boolean validatePhoneNumber(String phoneNumber) {
        if(phoneNumber == null || phoneNumber.length() == 0)
            return true;
        Pattern pattern = Pattern.compile("^(00|\\+)40\\d{9}$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }

    private static boolean validateLastName(String lastName) {
        Pattern pattern = Pattern.compile("^([a-zA-Z]+[\\s-])*[a-zA-Z]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(lastName);
        return lastName.length() >= 2 && lastName.length() <= 25 && matcher.matches();
    }

    private static boolean validateFirstName(String firstName) {
        Pattern pattern = Pattern.compile("^([a-zA-Z]+[\\s-])*[a-zA-Z]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(firstName);
        return firstName.length() >= 2 && firstName.length() <= 25 && matcher.matches();
    }

    private static boolean validateDateOfBirth(Date dateOfBirth) {
        return dateOfBirth.before(Date.from(ZonedDateTime.now().minusYears(18).toInstant())) && dateOfBirth.after(Date.from(ZonedDateTime.now().minusYears(120).toInstant()));
    }

    static private boolean validateEmail(String email)
    {
        Pattern pattern = Pattern.compile("^[\\w!#$%&???*+/=?`{|}~^-]+(?:\\.[\\w!#$%&???*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
