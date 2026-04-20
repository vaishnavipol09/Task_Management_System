const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createTask,
  getTasks,
  updateStatus
} = require("../controllers/taskController");

router.post("/", auth, role("admin"), createTask);
router.get("/", auth, getTasks);
router.put("/:id", auth, updateStatus);

module.exports = router;