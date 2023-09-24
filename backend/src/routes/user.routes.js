const Router = require('express')
const { getAllUsers, registerUser, loginUser } = require('../controllers/user.controller')

const userRouter = Router()

userRouter.get('/api/getAllUsers', getAllUsers)
userRouter.post('/api/register', registerUser)
userRouter.post('/api/login', loginUser)

module.exports = userRouter