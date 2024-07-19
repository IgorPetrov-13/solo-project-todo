import axios from 'axios';
import type { TasksTypeWithUser, NewTask, Task } from './TypeTasks';

export async function getApiTasks(userId: number): Promise<TasksTypeWithUser> {
  const { data } = await axios.get<{ allTasks: TasksTypeWithUser }>(`/api/user/${userId}`);
  return data.allTasks;
}

export async function createApiTasks(userId: number, obj: NewTask): Promise<Task> {
  const { data } = await axios.post<{ newTask: Task }>(`/api/user/${userId}`, obj);
  return data.newTask;
}

export async function deleteApiTasks(userId: number): Promise<string> {
  const { data } = await axios.get<{ message: string }>(`/api/user/${userId}`);
  return data.message;
}

export async function updateApiTasks(userId: number): Promise<string> {
  const { data } = await axios.put<{ message: string }>(`/api/user/${userId}`);
  return data.message;
}
