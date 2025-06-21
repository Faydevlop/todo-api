const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const taskCtrl = require("../controllers/taskController");

router.post("/", auth, taskCtrl.createTask);
router.get("/", auth, taskCtrl.getTasks);
router.get("/search", auth, taskCtrl.searchTasks);
router.get("/category/:category", auth, taskCtrl.getByCategory);
router.get("/:taskId", auth, taskCtrl.getTask);
router.put("/:taskId", auth, taskCtrl.updateTask);
router.delete("/:taskId", auth, taskCtrl.deleteTask);
router.post("/:taskId/markCompleted", auth, taskCtrl.markCompleted);
router.post("/:taskId/markPending", auth, taskCtrl.markPending);

module.exports = router;
