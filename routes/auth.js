const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
var JWT_SECRET = "chinugupta1234567";

//Create a user using:POST "/api/auth/createUser"
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    let Success = false;
    //if there are errors then,return bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    //check weather the user with the same email exist already or not
    try {
      //
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({Success, error: "sorry the user with this email exist" });
      }
      const salt = await bcrypt.genSalt(10);

      const hashpassword = await bcrypt.hash(req.body.password, salt);
      //create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authtoken = jwt.sign(data, JWT_SECRET);

      Success = true;
      res.json({    Success ,authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//login a user using:POST "/api/auth/login"
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let Success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        Success = false;
        return res
          .status(400)
          .json({
            Success,
            error: "please try to login with correct credentials",
          });
      }
      //data of user
      const data = {
        id: user.id,
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      Success = true;
      res.json({ Success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//getlogin user details using :POST "/api/auth/getuser".login required  
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    // const userId = req.user.id;
    const userId = req.user ? req.user.id : null;
    if (!userId) {
      return res.status(401).json({ error: "User not authorized" });
    }
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error" + error.message);
  }
});

module.exports = router;
