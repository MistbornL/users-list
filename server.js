require("dotenv").config(); // load .env variables
const express = require("express"); // import express
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors"); // import cors
const UserRoutes = require("./controllers/userController"); //import User Routes
const Users = require("./routes/userRoutes");

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const { PORT = 5000 } = process.env;

// Create Application Object
const app = express();

// GLOBAL MIDDLEWARE
app.use(cors()); // add cors headers
app.use(express.json()); // parse json bodies

app.get("/", (req, res) => {
  res.send("this is the test route to make sure server is working");
});
app.use("/users", Users);
app.use("/user", UserRoutes); // send all "/user" requests to UserRouter for routing

// APP LISTENER
app.listen(PORT, () => log.green("SERVER STATUS", `Listening on port ${PORT}`));
