const express = require('express')
const serverConfig = require('./server-config')
const userRouter = require('./routes/user.routes')

const server = () => {
  const app = express()

  app.use(serverConfig)
  app.use(userRouter)
  
  const run = (port) => {
    app.listen(port)
  }

  return {
    app,
    run
  }
}

module.exports = server