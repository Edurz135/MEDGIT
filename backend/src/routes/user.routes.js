const Router = require('express')
const { getAllUsers } = require('../controllers/user.controller')

const userRouter = Router()

userRouter.get('/api/getAllUsers', getAllUsers)

module.exports = userRouter