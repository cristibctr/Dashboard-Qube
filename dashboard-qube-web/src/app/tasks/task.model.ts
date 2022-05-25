export interface Task {
    id?: string,
    title: string;
    dueDate: string;
    done: boolean;
    description: string;
    priority: string;
    assignedToUser: string;
    createdByUser: string;
}