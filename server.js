const express = require("express"); // import express

const cors = require("cors"); // import cors
const { config } = require("dotenv");

const PORT = process.env.PORT || 5000;

// Create Application Object
const app = express();

// GLOBAL MIDDLEWARE
app.use(cors()); // add cors headers
app.use(express.json()); // parse json bodies

// ROUTES AND ROUTES
app.get("/", (req, res) => {
  res.send("this is the test route to make sure server is working");
});

// APP LISTENER
app.listen(PORT, () =>
  console.log("SERVER STATUS", `Listening on port ${PORT}`)
);
