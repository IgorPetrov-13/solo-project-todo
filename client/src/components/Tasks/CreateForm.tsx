import React, { useState } from 'react';
import type { TypeNewTask, TypeTasks } from './TypeTasks';
import { createApiTasks } from './api';

type TypeProps = {
  //   task: TypeTask;
  setTasks: React.Dispatch<React.SetStateAction<TypeTasks | []>>;
  //   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateForm({ setTasks }: TypeProps): JSX.Element {
  const [form, setForm] = useState<TypeNewTask>({
    title: '',
    description: '',
    isDone: false,
    userId: 1,
  });
  const [err, setErr] = useState<string>('');
  const [inf, setInf] = useState<string>('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (form.title && form.description) {
      const data = await createApiTasks(form);
      console.log(data);
      if (data.message === 'success') {
        setTasks((prev) => [...prev, data.newTask]);
        setInf(`Задача ${form.title} успешно добавлена!`);
      }
    } else {
      setErr('I need more information about task');

      console.log('I need more information about task');
    }
  };

  return (
    <form onSubmit={(e): React.FormEvent<HTMLFormElement> => submitHandler(e)}>
      <input
        style={{ borderRadius: '5px', height: '20px', marginBottom: '10px', paddingLeft: '5px' }}
        type="text"
        value={form.title}
        placeholder="title"
        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
      />
      <br />
      <input
        style={{ borderRadius: '5px', height: '20px', paddingLeft: '5px' }}
        required
        type="text"
        value={form.description}
        placeholder="description"
        onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
      />
      <br />
      <br />
      <input type="submit" />
      {inf ? <p>{inf}</p> : <span />}
      {err ? <p>{err}</p> : <span />}
    </form>
  );
}

export default CreateForm;
