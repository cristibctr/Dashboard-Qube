export interface Task {
  id?: string,
  title: string;
  dueDate: string;
  description: string;
  priority: string;
<<<<<<< HEAD
  done: boolean;
=======
  status: string;
>>>>>>> 1e00b8a7f13c78f324318b43b9a82d7255e7cb74
  assignedToUser: string;
  createdByUser: string;
}
