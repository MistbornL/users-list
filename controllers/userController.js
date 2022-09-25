require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const User = require("../models/userModel"); // import user model
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { isLoggedIn } = require("./midleware");

const router = Router(); // create router to create route bundle

//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const SECRET = process.env.SECRET;

// Signup route to create a new user
router.post("/signup", async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create date for user registrations
    req.body.dateRegister = Date.now();
    // create a new user
    const user = await User.create(req.body);
    await user.save();
    // send new user as response
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

// Login route to verify a user and get a token
router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });

    if (user.status === "Blocked") {
      return res.status(400).json({ message: "This email is blocked." });
    }

    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        const token = await jwt.sign({ email: user.email }, SECRET);
        user.dateLastAuthorization = Date.now();
        user.status = "Online";
        await user.save();
        res.json({ token, userId: user.id });
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/logout", isLoggedIn, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.userId, { status: "Offline" });
    res.status(200).json({ message: "User changed." });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong, try again." });
  }
});

module.exports = router;
