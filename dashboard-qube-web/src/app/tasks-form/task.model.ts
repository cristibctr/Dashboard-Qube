export interface Task {
  id?: string,
  title: string;
  dueDate: string;
  description: string;
  priority: string;
  status: string;
  assignedToUser: string;
  createdByUser: string;
}
