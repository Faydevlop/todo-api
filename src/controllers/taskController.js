const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, dueDate, category } = req.body;
  try {
    const task = await Task.create({
      userId: req.userId,
      title,
      description,
      dueDate,
      category
    });
    res.status(201).json(task);
  } catch {
    res.status(500).json({ msg: "Failed to create task" });
  }
};

exports.getTasks = async (req, res) => {
  const { status, category, dueDate } = req.query;
  const filter = { userId: req.userId };
  if (status) filter.status = status;
  if (category) filter.category = category;
  if (dueDate) filter.dueDate = new Date(dueDate);
  const tasks = await Task.find(filter).sort({ dueDate: 1 });
  res.json(tasks);
};

exports.getTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.taskId, userId: req.userId });
  if (!task) return res.status(404).json({ msg: "Task not found" });
  res.json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, userId: req.userId },
    { ...req.body, updatedAt: Date.now() },
    { new: true }
  );
  if (!task) return res.status(404).json({ msg: "Task not found" });
  res.json(task);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.taskId, userId: req.userId });
  if (!task) return res.status(404).json({ msg: "Task not found" });
  res.json({ msg: "Task deleted" });
};

exports.markCompleted = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, userId: req.userId },
    { status: "completed", updatedAt: Date.now() },
    { new: true }
  );
  res.json(task);
};

exports.markPending = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.taskId, userId: req.userId },
    { status: "pending", updatedAt: Date.now() },
    { new: true }
  );
  res.json(task);
};

exports.getByCategory = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId, category: req.params.category });
  res.json(tasks);
};

exports.searchTasks = async (req, res) => {
  const query = req.query.query;
  const tasks = await Task.find({
    userId: req.userId,
    $or: [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } }
    ]
  });
  res.json(tasks);
};
