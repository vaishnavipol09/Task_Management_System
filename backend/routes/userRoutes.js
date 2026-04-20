const router = require("express").Router();
const User = require("../models/User");

// Get all users (only role = user)
router.get("/", async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("name email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

module.exports = router;