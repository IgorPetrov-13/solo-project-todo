import React, { useState } from 'react';
import type { TypeTask, TypeTasks } from './TypeTasks';
import { updateApiTasks } from './api';

type TypeProps = {
  task: TypeTask;
  setTasks: React.Dispatch<React.SetStateAction<TypeTasks | []>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function UpdateForm({ task, setTasks, setIsOpen }: TypeProps): JSX.Element {
  const [form, setForm] = useState(task);

  const updateHandler = async (e: Event, id: number): Promise<void> => {
    e.preventDefault();
    console.log(e, 'eeeee');
    console.log(id, 'iddddddddddd');
    const data = await updateApiTasks(id, form);
    if (data.message === 'success') {
      setTasks((prev) => prev.map((el) => (el.id === id ? { ...el, ...form } : el)));
      setIsOpen(false);
      console.log(`updated`);
    }
  };

  return (
    <form onSubmit={(e) => void updateHandler(e, form.id)}>
      <p>
        <em>Внесите изменения</em>
      </p>
      <input
        required
        type="text"
        value={form.title}
        placeholder="title"
        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
      />
      <br />
      <input
        required
        type="text"
        value={form.description}
        placeholder="description"
        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
      />
      <br />
      <input type="submit" />
    </form>
  );
}

export default UpdateForm;
