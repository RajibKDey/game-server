const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { accountValidation } = require("../validation");

exports.signup = async (req, res) => {
  //Validation
  const { error } = accountValidation(req.body);
  if (error)
    return res.status(400).send({
      success: false,
      message: error.details[0].message,
    });

  //Check if user exists
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(200).send({
      success: false,
      message: "Email already exists",
    });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Error while saving to database",
    });
  }
};

exports.login = async (req, res) => {
  //Validation
  const { error } = accountValidation(req.body);
  if (error)
    return res.status(200).send({
      success: false,
      message: error.details[0].message,
    });

  //Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send({
      success: false,
      message: "User doesn't exist. Please check your email",
    });

  //Check if password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send({
      success: false,
      message: "Invalid password. Please check your password",
    });

  //Create JWT
  const token = jwt.sign({ email: user.email }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({
    success: true,
    message: "User logged in successfully",
    data: token,
  });
};
