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
          userId: 1,
        },
        {
          title: "Перейти на 3-ю фазу в Elbrus bootcamp",
          description: "Повторить 2-ю фазу и сдать экзамен",
          userId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tasks", null, {});
  },
};
