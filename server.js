const express = require("express");
require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json({ extended: true }));

// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/users", require("./routes/users.routes"));

const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;
const start = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
};

start();
