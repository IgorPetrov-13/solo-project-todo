import React, { useState, useEffect } from 'react';
import type { Tasks } from './TypeTasks';
import { getApiTasks } from './api';
import TaskItem from './TaskItem';

function Tasks(): JSX.Element {
  const [tasks, setTasks] = useState<Tasks | []>([]);

  useEffect(() => {
    getApiTasks(1)
      .then((data) => setTasks(data))
      .catch(console.log);
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskItem task={task} setTasks={setTasks} />
        </div>
      ))}
    </div>
  );
}

export default Tasks;
