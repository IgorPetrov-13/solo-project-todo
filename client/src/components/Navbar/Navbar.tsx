import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Arial',
        color: 'black',
        fontSize: '35px',
        textShadow: '7px 7px 5px rgba(0, 0, 0, 0.5)',
        padding: '10px',
        position: 'sticky',
        top: ' 0',
        backgroundColor: 'white',
        zIndex: '2',
        // Добавить отступы
      }}
    >
      <NavLink
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#363780' : 'black',
          margin: '0 10px', // Добавить пробелы между ссылками
          transition: 'color 0.3s ease',
          // Добавить плавный переход
        })}
        to="/task"
      >
        Главная
      </NavLink>
      <NavLink
        style={({ isActive }) => ({
          textDecoration: 'none',
          color: isActive ? '#363780' : 'black',
          margin: '0 10px', // Добавить пробелы между ссылками
          transition: 'color 0.3s ease',
          // Добавить плавный переход
        })}
        to="/task/new"
      >
        Новая задача
      </NavLink>
    </nav>
  );
}

export default Navbar;
