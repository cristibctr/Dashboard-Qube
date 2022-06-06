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
        boolean emailOrPhoneNumberValidation = validateEmailOrPhoneNumber(individualClientDTO.getEmail(),
            individualClientDTO.getPhoneNumber());
        boolean dateOfBirthValidation = validateDateOfBirth(individualClientDTO.getDateOfBirth());
        boolean firstNameValidation = validateFirstName(individualClientDTO.getFirstName());
        boolean lastNameValidation = validateLastName(individualClientDTO.getLastName());
        boolean phoneNumberValidation = validatePhoneNumber(individualClientDTO.getPhoneNumber());
        boolean cityValidation = validateCity(individualClientDTO.getCity());
        boolean countryValidation = validateCountry(individualClientDTO.getCountry());
        boolean postalCodeValidation = validatePostalCode(individualClientDTO.getPostalCode());
        boolean addressLine1Validation = validateAddressLine1(individualClientDTO.getStreetName(),
            individualClientDTO.getNumber());
        boolean addressLine2Validation = validateAddressLine2(individualClientDTO.getBuilding(),
            individualClientDTO.getApartment(), individualClientDTO.getFloor());

        return emailOrPhoneNumberValidation &
            emailValidation &
            dateOfBirthValidation &
            firstNameValidation &
            lastNameValidation &
            phoneNumberValidation &
            cityValidation &
            countryValidation &
            postalCodeValidation &
            addressLine1Validation &
            addressLine2Validation
            ;
    }

    private static boolean validateEmailOrPhoneNumber(String email, String phoneNumber) {
        if((email == null || email == "") && (phoneNumber == null || phoneNumber == "")){
            return false;
        }
        return true;
    }

    private static boolean validateAddressLine2(String building, String apartment, String floor) {
        if((building != null && building.length() > 4) || ( apartment!= null && apartment.length() > 4) || (floor != null && floor.length() > 3)){
            return false;
        }

        Pattern buildingPattern = Pattern.compile("^[\\S]+$", Pattern.CASE_INSENSITIVE);
        Matcher buildingMatcher = buildingPattern.matcher(building);

        if(building != "" && !buildingMatcher.matches()){
            return false;
        }

        Pattern apartmentPattern = Pattern.compile("^[0-9]+$");
        Matcher apartmentMatcher = apartmentPattern.matcher(apartment);

        if(apartment != "" && !apartmentMatcher.matches()){
            return false;
        }

        Pattern floorPattern = Pattern.compile("^[0-9]+$");
        Matcher floorMatcher = floorPattern.matcher(floor);

        if(floor != "" && floorMatcher.matches() == false){
            return false;
        }

        return true;
    }

    private static boolean validateAddressLine1(String streetName, String number) {

        if((number != null && number.length() > 10) || (streetName != null && (streetName.length() == 1 || streetName.length() > 30))){
            return false;
        }

        Pattern streetPattern = Pattern.compile("^([a-zA-Z]+[\\s-])*[a-zA-Z]+$", Pattern.CASE_INSENSITIVE);
        Matcher streetMatcher = streetPattern.matcher(streetName);

        if(streetName != "" &&!streetMatcher.matches()){
            return false;
        }
        Pattern numberPattern = Pattern.compile("^[\\S]+$");
        Matcher numberMatcher = numberPattern.matcher(number);

        if(number != "" &&!numberMatcher.matches()){
            return false;
        }

        return true;
    }

    private static boolean validatePostalCode(String postalCode) {
        if(postalCode == null || postalCode == ""){
            return true;
        }
        if(postalCode != "" && (postalCode.length() < 2 || postalCode.length() > 10)){
            return false;
        }
        Pattern pattern = Pattern.compile("^[\\S]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(postalCode);

        if(postalCode != "" && !matcher.matches()){
            return false;
        }
        return true;
    }



    private static boolean validateCountry(String country) {
        if(country == null || country.length() == 0)
            return true;

        return country.length() >= 1 && country.length() <= 60;
    }

    private static boolean validateCity(String city) {
        if(city == null || city.length() == 0)
            return true;
        return city.length() >= 1 && city.length() <= 60;
    }

    private static boolean validatePhoneNumber(String phoneNumber) {
        if(phoneNumber == null || phoneNumber.length() == 0)
            return true;
        Pattern pattern = Pattern.compile("^\\+?\\d+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches() && phoneNumber.length() >= 3 && phoneNumber.length() <= 20;
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
        if(email == null || email.length() == 0){
            return true;
        }
        Pattern pattern = Pattern.compile("^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

}
