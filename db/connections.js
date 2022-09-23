const mongoose = require("mongoose");
const { log } = require("mercedlogger");
const URI = process.env.MONGODB_URI;

mongoose.connect = mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .on("open", () => log.green("DATABASE STATE", "Connection Open"))
  .on("close", () => log.magenta("DATABASE STATE", "Connection Open"))
  .on("error", (error) => log.red("DATABASE STATE", error));

// EXPORT CONNECTION
module.exports = mongoose;
