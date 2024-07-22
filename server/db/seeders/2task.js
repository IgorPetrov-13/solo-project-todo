"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tasks",
      [
        {
          title: "Осмотр достопримечательностей",
          description: "Посетить самые популярные туристические места в СПб",
          isDone: true,
          userId: 1,
        },
        {
          title: "Перейти на 3-ю фазу в Elbrus bootcamp",
          description: "Повторить 2-ю фазу и сдать экзамен",
          isDone: false,
          userId: 1,
        },
        {
          title: "Тестовая задача",
          description: "Тестовая задача, которая не должна отобрпзиться ",
          isDone: false,
          userId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
