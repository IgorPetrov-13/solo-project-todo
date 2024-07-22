const userRoute = require("express").Router();
const { Task, User } = require("../../db/models");
//const verifyAccessToken = require("../../middleware/verifyAccessToken");

//!гет запрос на главную - реализовать
// tasksRoute.get("/:userId", async (req, res) => {
//   try {
//     console.log("HELLO from main page");
//     const { userId } = req.params;
//     const targetUser = await User.findOne({ where: { id: userId } });
//     console.log("targetUser+++", targetUser);
//     const allTasks = await Task.findAll({ where: { userId } });
//     res.status(200).json({ message: "success", targetUser, allTasks });
//   } catch (error) {
//     res.status(500).json(error.message);
//   }
// });

userRoute.get("/:userId", async (req, res) => {
  try {
    console.log("HELLO from main page");
    const { userId } = req.params;
    const allTasks = await Task.findAll({
      where: { userId },
      include: User,
      order: [
        // Сначала выводим задачи, где isDone = true
        ["isDone", "DESC"],
        // Затем остальные задачи по дате создания записи
        ["createdAt", "ASC"],
      ],
    });
    res.status(200).json({ message: "success", allTasks });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

userRoute.put("/:userId", async (req, res) => {
  try {
    console.log("HELLO from PUT");
    const { userId } = req.params;
    const taskId = req.headers.taskid; //? //!// получаем id задачи из заголовков
    const { title, description, isDone } = req.body;

    const task = await Task.findOne({
      where: {
        userId,
        id: taskId,
      },
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.update({
      title,
      description,
      isDone,
    });

    res.status(200).json({ message: "success", task });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

userRoute.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, isDone } = req.body;
    const newTask = Task.create({ userId, title, description, isDone });
    res.status(201).json({ message: "success", newTask });
  } catch (error) {}
});

userRoute.delete("/:userId", async () => {
  try {
    const { userId } = req.params;
    const taskId = req.body; //! получаем id задачи из заголовков
    console.log("req.body", req.body);
    console.log("taskId HEADER", taskId);

    const deletedTask = await Task.destroy({
      where: {
        taskId,
      },
    });

    if (deletedTask === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRoute;
