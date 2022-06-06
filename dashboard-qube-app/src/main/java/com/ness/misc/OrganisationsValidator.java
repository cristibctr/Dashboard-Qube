package com.ness.misc;


import com.ness.dtos.OrganisationDTO;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class OrganisationsValidator {
    public static boolean validate(OrganisationDTO organisationDTO)
    {
        boolean emailValidation = validateEmail(organisationDTO.getEmail());
        boolean organisationTypeValidation = validateOrganisationType(organisationDTO.getOrganisationType());
        boolean emailOrPhoneNumberValidation = validateEmailOrPhoneNumber(organisationDTO.getEmail(),
            organisationDTO.getPhoneNumber());
        boolean nameValidation = validateName(organisationDTO.getName());
        boolean contactNameValidation = validateContactName(organisationDTO.getContactName());
        boolean phoneNumberValidation = validatePhoneNumber(organisationDTO.getPhoneNumber());
        boolean cityValidation = validateCity(organisationDTO.getCity());
        boolean countryValidation = validateCountry(organisationDTO.getCountry());
        boolean postalCodeValidation = validatePostalCode(organisationDTO.getPostalCode());
        boolean addressLine1Validation = validateAddressLine1(organisationDTO.getStreetName(),
            organisationDTO.getNumber());
        boolean addressLine2Validation = validateAddressLine2(organisationDTO.getBuilding(),
            organisationDTO.getApartment(), organisationDTO.getFloor());
        boolean taxIdValidation = validateTaxId(organisationDTO.getTaxId());

        return emailOrPhoneNumberValidation &
            emailValidation &
            nameValidation &
            contactNameValidation &
            phoneNumberValidation &
            cityValidation &
            countryValidation &
            postalCodeValidation &
            addressLine1Validation &
            addressLine2Validation &
            taxIdValidation &
            organisationTypeValidation
            ;
    }

    private static boolean validateOrganisationType(String organisationType) {
        if(organisationType.toLowerCase().equals("company") || organisationType.toLowerCase().equals("public " +
            "organisation")){
            return true;
        }
        return false;
    }

    private static boolean validateTaxId(String taxId) {
        if(taxId == null || taxId.length() == 0)
            return false;
        Pattern pattern = Pattern.compile("[0-9]{6,6}$");
        Matcher matcher = pattern.matcher(taxId);
        return matcher.matches();
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

        if(floor != "" && !floorMatcher.matches()){
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

        if(streetName != "" && !streetMatcher.matches()){
            return false;
        }
        Pattern numberPattern = Pattern.compile("^[\\S]+$");
        Matcher numberMatcher = numberPattern.matcher(number);

        if(number != "" && !numberMatcher.matches()){
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
        Pattern pattern = Pattern.compile("^(00|\\+)40\\d{9}$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(phoneNumber);
        return matcher.matches();
    }

    private static boolean validateContactName(String contactName) {
        if(contactName == null || contactName.length() == 0)
            return false;
        Pattern pattern = Pattern.compile("^([a-zA-Z]+[\\s-])*[a-zA-Z]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(contactName);
        return contactName.length() >= 2 && contactName.length() <= 25 && matcher.matches();
    }

    private static boolean validateName(String name) {
        if(name == null || name.length() == 0)
            return false;
        Pattern pattern = Pattern.compile("^([a-zA-Z]+[\\s-])*[a-zA-Z]+$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(name);
        return name.length() >= 2 && name.length() <= 25 && matcher.matches();
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
