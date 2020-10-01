const { request } = require("../app");

const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  //Check if token exists
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).send({
      success: false,
      message: "Access Denied",
    });

  //Validate token
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
