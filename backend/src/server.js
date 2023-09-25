const express = require("express");
const serverConfig = require("./config/server-config");
const userRouter = require("./routes/user.routes");
const doctorRouter = require("./routes/doctor.routes");

const server = () => {
  const app = express();

  app.use(serverConfig);
  app.use(userRouter);
  app.use(doctorRouter);

  const run = (port) => {
    app.listen(port);
  };

  const { db } = require("./db");
  db.sequelize
    .sync()
    .then(() => {
      console.log("DB Synced.");
    })
    .catch((err) => {
      console.log("Failed to sync db: " + err.message);
    });

  return {
    app,
    run,
  };
};

module.exports = server;
