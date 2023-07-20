const { request } = require('express')
const Task = require('../models/todoSchema')
const createError= require('../utils/errorHandler')
//should pass the user id in req.boy.user
//pass the title,completed and userId in req.boy.user
exports.createTask = async (req,res,next) => {
    try{
        const newTask = new Task({
             title: req.body.title,
             user:req.body.user,
             completed: req.body.completed
        })
        const savedTask = await newTask.save()
        return res.status(200).json(savedTask)
    }
    catch(err){
      return next(err)
    }
}


exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({})
        return res.status(200).json(tasks)
    } catch (error) {
      return  next(error)
    }
}

exports.getTask = async (req, res, next) => {
    try {
      const taskId = req.params.taskId;
      console.log(taskId);
      const task = await Task.findById(taskId);
      if (!task) {
        return next(createError({ status: 404, message: "No task found" }));
      }
      return res.status(200).json(task);
    } catch (err) {
      return next(err);
    }
  };
  
  

 exports.updateTask = async (req, res, next) => {
    const taskId = req.params.taskId;
    // console.log(taskId);
    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId,{
            title: req.body.title,
            completed: req.body.completed,
        },{new:true})
        return res.status(200).json(updatedTask)
        
    } catch (error) {
        return next(error)
    }
}


exports.deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return next(createError({ status: 404, message: 'Task not found' }));
    }
    
    await Task.findByIdAndDelete(taskId);
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

exports.deleteAllTasks = async (req, res, next) => {
    try {
      await Task.deleteMany({ user: req.user.id });
      return res.json('All Todo Deleted Successfully');
    } catch (err) {
      return next(err);
    }
  };




  
  