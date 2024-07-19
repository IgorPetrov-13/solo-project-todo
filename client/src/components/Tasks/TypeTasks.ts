export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Task = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export type TaskWithUser = {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
  User: User;
};

export type NewTask = {
  title: string;
  description: string;
  isDone: boolean;
  userId: number;
};

export type TasksTypeWithUser = TaskWithUser[];
export type Tasks = Task[];
