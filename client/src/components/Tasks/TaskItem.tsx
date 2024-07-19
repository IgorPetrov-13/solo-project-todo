import React from 'react';
import type { Tasks, Task } from './TypeTasks';

type PropsType = {
  task: Task;
  setTasks: React.Dispatch<React.SetStateAction<Tasks | []>>;
};

function TaskItem({ task, setTasks }: PropsType): JSX.Element {
  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
    </div>
  );
}

export default TaskItem;
