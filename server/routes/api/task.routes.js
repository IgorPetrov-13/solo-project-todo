const taskRoute = require("express").Router();
const { Task } = require("../../db/models");

taskRoute.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json({ message: "success", tasks });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

taskRoute.get("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ where: { id: taskId } });
    res.status(200).json({ message: "success", task });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

taskRoute.post("/new", async (req, res) => {
  const { title, description, isDone, userId } = req.body;
  try {
    const newTask = Task.create({ title, description, isDone, userId });
    res.status(201).json({ message: "success", newTask });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

taskRoute.delete("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const deletedTask = Task.destroy({ where: { id: taskId } });
    if (deletedTask === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

taskRoute.put("/:taskId", async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await Task.update(req.body, { where: { id: taskId } });

    res.status(200).json({ message: "success", task });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = taskRoute;
