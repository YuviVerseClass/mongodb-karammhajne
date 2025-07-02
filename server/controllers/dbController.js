const Task = require('../models/Task');

// GET /tasks
async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("❌ Failed to fetch tasks:", err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
}

// POST /tasks
async function addTask(req, res) {
  try {
    console.log("📦 Received body:", req.body);

    const { title } = req.body;

    if (!title || typeof title !== 'string') {
      console.error("❌ Invalid or missing title");
      return res.status(400).json({ error: "Invalid or missing 'title'" });
    }

    const newTask = new Task({ title });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    console.error("❌ Failed to add task:", err);
    res.status(500).json({ error: 'Server error while adding task' });
  }
}

// PATCH /tasks/:id
async function toggleTask(req, res) {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.done = !task.done;
    await task.save();

    res.json(task);
  } catch (err) {
    console.error("❌ Failed to toggle task:", err);
    res.status(500).json({ error: 'Failed to toggle task' });
  }
}

// DELETE /tasks/:id
async function deleteTask(req, res) {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error("❌ Failed to delete task:", err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
}

module.exports = {
  getTasks,
  addTask,
  toggleTask,
  deleteTask,
};
