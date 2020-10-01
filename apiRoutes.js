const express = require("express");
const router = express.Router();

const verify = require("./routes/privateRoutes");
const UnAuthRoutesController = require("./routes/auth");
const AuthenticatedRoutesController = require("./routes/authRoutes");

//Login
router.post("/auth/login", UnAuthRoutesController.login);

//Signup
router.post("/auth/signup", UnAuthRoutesController.signup);

//Save score
router.post("/score", verify, AuthenticatedRoutesController.save_score);

//Get today's scores
router.get("/todayScores", verify, AuthenticatedRoutesController.today_scores);

//Get score history
router.get(
  "/scoreHistory",
  verify,
  AuthenticatedRoutesController.score_history
);

//Get high score
router.get("/highScore", verify, AuthenticatedRoutesController.high_score);

module.exports = router;
