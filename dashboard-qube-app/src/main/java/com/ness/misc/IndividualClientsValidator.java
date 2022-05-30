package com.ness.misc;

import com.ness.dtos.IndividualClientDTO;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class IndividualClientsValidator {

    public static boolean validate(IndividualClientDTO individualClientDTO)
    {
        boolean emailValidation = validateEmail(individualClientDTO.getEmail());
        boolean dateOfBirthValidation = validateDateOfBirth(individualClientDTO.getDateOfBirth());
        boolean firstNameValidation = validateFirstName(individualClientDTO.getFirstName());
        boolean lastNameValidation = validateLastName(individualClientDTO.getLastName());
        boolean phoneNumberValidation = validatePhoneNumber(individualClientDTO.getPhoneNumber());
        boolean cityValidation = validateCity(individualClientDTO.getCity());
        boolean countryValidation = validateCountry(individualClientDTO.getCountry());
        boolean nationalityValidation = validateNationality(individualClientDTO.getNationality());
        boolean postalCodeValidation = validatePostalCode(individualClientDTO.getPostalCode());
        boolean addressLine1Validation = validateAddressLine1(individualClientDTO.getStreetName(),
            individualClientDTO.getNumber());
        boolean addressLine2Validation = validateAddressLine2(individualClientDTO.getBuilding(),
            individualClientDTO.getApartment(), individualClientDTO.getFloor());

        return emailValidation &
            dateOfBirthValidation &
            firstNameValidation &
            lastNameValidation &
            phoneNumberValidation &
            cityValidation &
            countryValidation &
            nationalityValidation &
            postalCodeValidation &
            addressLine1Validation &
            addressLine2Validation
            ;
    }

    private static boolean validateAddressLine2(String building, String apartment, String floor) {
        if((building != null && building.length() > 4) || ( apartment!= null && apartment.length() > 4) || (floor != null && floor.length() > 3)){
            return false;
        }
        return true;
    }

    private static boolean validateAddressLine1(String streetName, String number) {
        if((number != null && number.length() > 10) || streetName != null && (streetName.length() < 2 || streetName.length() > 30)){
            return false;
        }
        return true;
    }

    private static boolean validatePostalCode(String postalCode) {
        if(postalCode != null && (postalCode.length() == 0 || postalCode.length() < 2 || postalCode.length() > 10)){
            return false;
        }
        return true;
    }

    private static boolean validateNationality(String nationality) {
        if(nationality != null && nationality.length() == 0){
            return false;
        }
        return true;
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
        Pattern pattern = Pattern.compile("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
