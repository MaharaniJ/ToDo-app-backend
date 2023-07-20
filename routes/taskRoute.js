const express = require('express')
const { createTask,getTasks,getTask,updateTask,deleteTask,deleteAllTasks } = require('../controllers/taskController')
const router = express.Router()

router.post('/create',createTask)
router.get('/gettasks',getTasks)
router.get('/:taskId', getTask);
router.put('/:taskId',updateTask)
router.delete('/:taskId',deleteTask)
router.delete('/deleteAll', deleteAllTasks);


module.exports =router;