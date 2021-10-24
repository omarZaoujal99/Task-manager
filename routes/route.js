const express = require("express");
const controllers = require("../controllers/tasksControllers")
const router = express.Router();

router.route("/").get(controllers.getAllTasks).post(controllers.createTask)
    .delete(controllers.deleteTask).patch(controllers.updateTask);

module.exports = router;
