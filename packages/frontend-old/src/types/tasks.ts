export enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: string;
  }