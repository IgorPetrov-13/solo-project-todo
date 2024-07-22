import React, { useState, useEffect } from 'react';

import TaskItem from './TaskItem';
import type { TypeTasks } from './TypeTasks';
import { getApiTasks } from './api';

type TypeProps = {
  tasks: TypeTasks;
  setTasks: React.Dispatch<React.SetStateAction<TypeTasks | []>>;
};

function TasksList({ tasks, setTasks }: TypeProps): JSX.Element {
  useEffect(() => {
    getApiTasks()
      .then((data) => setTasks(data))
      .catch(console.log);
  }, []);

  return (
    <div className="container">
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskItem task={task} setTasks={setTasks} />
        </div>
      ))}
      <br />
    </div>
  );
}

export default TasksList;
