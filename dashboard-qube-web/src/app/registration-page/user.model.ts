export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    phoneNumber?: string;
    city?: string;
    country?: string;
}