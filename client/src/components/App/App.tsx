import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import TasksList from '../Tasks/TasksList';
import Navbar from '../Navbar/Navbar';
import ErrorPage from '../Error/ErrorPage';
import CreateForm from '../Tasks/CreateForm';
import { getApiTasks } from '../Tasks/api';
import type { TypeTasks } from '../Tasks/TypeTasks';

function App(): JSX.Element {
  const [tasks, setTasks] = useState<TypeTasks | []>([]);

  // useEffect(() => {
  //   getApiTasks()
  //     .then((data) => setTasks(data))
  //     .catch(console.log);
  // }, []);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/task" element={<TasksList tasks={tasks} setTasks={setTasks} />} />
        <Route path="/task/new" element={<CreateForm setTasks={setTasks} />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
