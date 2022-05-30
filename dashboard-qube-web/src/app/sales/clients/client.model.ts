export interface Client {
    id?: number;
    salutation: Salutation;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality?: string;
    streetName?: string;
    number?: string;
    building?: string;
    apartment?: string;
    floor?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    email?: string;
    phoneNumber?: string;
}

enum Salutation {
    MR = "MR",
    MRS = "MRS",
    MS = "MS",
    MISS = "MISS"
}