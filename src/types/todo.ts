export interface Todo {
    id: string;
    title: string;
    description: string;
    status: boolean;
    dueDate?: string; // Optional
    createdAt: string;
    updatedAt: string;
  }
  