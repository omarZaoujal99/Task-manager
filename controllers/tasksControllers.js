const task = require("../mongoDBModels/tasksDB")
const customError = require("../errors/customError")

const getAllTasks = async (req,res)=>{
    let getTask = await task.find({});
    res.status(200).json({getTask});
}

const createTask = async (req,res)=>{
    let createTask = await task.create(req.body);
    if(!req.body) return res.send("taskName is not included...")
    res.status(200).json({createTask});
}

const updateTask = async (req,res)=>{
    let taskId = req.body._id;
    let updateTask = await task.findOneAndUpdate({_id:taskId},req.body,{new: true})
    if(!task) return res.status(404).send("404 - ID not included")
    res.status(200).json({updateTask});
}

const deleteTask = async (req,res,next)=>{
    let taskId = req.body._id;
    let deleteTask = await task.findOneAndDelete({_id:taskId});
    if(!task) return next(customError("There's no task with this "+taskId,404))
    res.status(200).json({deleteTask});
}


module.exports = {getAllTasks,updateTask,deleteTask,createTask}