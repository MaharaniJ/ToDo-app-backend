const express = require('express')
const router = express.Router()
const authRoute = require('./authRoute')
const userRoute = require('./userRoute')
const taskRoute = require('./taskRoute')

router.use('/auth',authRoute)
router.use('/users',userRoute)
router.use('/tasks',taskRoute)


module.exports =router;