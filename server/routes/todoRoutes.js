const express = require("express");
const {getAllTasks,getTask, addTask, editTask, deleteTask} = require("../controllers/todocontroller")
const router = express.Router();

router.get("/",getAllTasks)
router.get("/:id",getTask)
router.post("/addtask",addTask)
router.put("/updatetask/:id",editTask)
router.delete("/deletetask/:id",deleteTask)
module.exports = router;