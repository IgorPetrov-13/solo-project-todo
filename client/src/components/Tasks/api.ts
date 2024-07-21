import axios from 'axios';
import type { TypeNewTask, TypeTask, TypeTasks } from './TypeTasks';

export async function getApiTasks(): Promise<TypeTasks> {
  const { data } = await axios.get<{ tasks: TypeTasks }>(`api/task`);

  return data.tasks;
}

export async function createApiTasks(
  obj: TypeNewTask,
): Promise<{ message: string; newTask: TypeTask }> {
  const { data } = await axios.post<{ message: string; newTask: TypeTask }>(`/api/task/new`, obj);
  return data;
}

export async function deleteApiTasks(taskId: number): Promise<{ message: string }> {
  const { data } = await axios.delete<{ message: string }>(`api/task/${taskId}`);
  return data;
}

export async function updateApiTasks(taskId: number, form: TypeTask): Promise<{ message: string }> {
  const { data } = await axios.put<{ message: string }>(`/api/task/${taskId}`, form);
  return data;
}
