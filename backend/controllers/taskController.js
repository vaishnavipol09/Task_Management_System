const Task = require("../models/Task");
const mongoose = require("mongoose"); 

// Create Task
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    if (!title || !description || !assignedTo) {
      return res.status(400).json({ message: "All fields required" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo
    });

    res.json(task);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
};

// Get Tasks
exports.getTasks = async (req, res) => {
  try {
    console.log("LOGGED USER 👉", req.user);

    // Admin → all tasks
    if (req.user.role === "admin") {
      const tasks = await Task.find().populate("assignedTo", "name email");
      return res.json(tasks);
    }

    // User see only assigned tasks
    const tasks = await Task.find({
      assignedTo: new mongoose.Types.ObjectId(req.user.id)
    }).populate("assignedTo", "name email");

    res.json(tasks);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
  res.json(task);
};