export interface Task {
    id?: string,
    title: string;
    dueDate: string;
    description: string;
    priority: string;
    assignedToUser: string;
    createdByUser: string;
}