export interface Organisation {
  id?: number;
  organisationType: any;
  name: string;
  contactName: string;
  taxId: string;
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
