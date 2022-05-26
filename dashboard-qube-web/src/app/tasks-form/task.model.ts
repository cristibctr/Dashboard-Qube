export interface Task {
  id?: string,
  title: string;
  dueDate: string;
  description: string;
  priority: string;
  done: boolean;
  assignedToUser: string;
  createdByUser: string;
}
