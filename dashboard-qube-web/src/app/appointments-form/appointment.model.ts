export interface Appointment {
  id?: string,
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  contactType: string;
  assignedToUser: string;
  createdByUser: string;
}
