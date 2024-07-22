import React, { useState } from 'react';
import type { TypeTasks, TypeTask } from './TypeTasks';
import { deleteApiTasks } from './api';
import UpdateForm from './UpdateForm';

type TypeProps = {
  task: TypeTask;
  setTasks: React.Dispatch<React.SetStateAction<TypeTasks | []>>;
};

function TaskItem({ task, setTasks }: TypeProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = (): void => setIsOpen((prev) => !prev);
  const deleteHandler = async (id: number): Promise<void> => {
    const data = await deleteApiTasks(id); // Передайте id задачи
    if (data.message === 'success') {
      setTasks((prev: TypeTasks) => prev.filter((el: TypeTask) => el.id !== id));
    }
  };

  return (

    <div style={{width: "500px",padding:"10px", backgroundColor:"#f7f2f2", marginBottom:"20px", borderRadius: "10px"}}>
      <h3 style={{ marginBottom: '0px', paddingBottom: '0px' }}>Задача</h3>
      <p style={{ margin: '0px', padding: '0px' }}>{task.title}</p>
      <h3 style={{ marginBottom: '0px', paddingBottom: '0px' }}>Описание</h3>
      <p style={{ margin: '0px', padding: '0px' }}>{task.description}</p>
      {isOpen && <UpdateForm task={task} setTasks={setTasks} setIsOpen={setIsOpen} />}
      <button type="button" onClick={toggleOpen}>
        Изменить
      </button>

      <button type="button" onClick={() => void deleteHandler(task.id)}>
        Удалить
      </button>
    </div>
  );
}

export default TaskItem;
