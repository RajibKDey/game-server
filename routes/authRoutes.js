const Score = require("../models/Score");
const moment = require("moment");

exports.save_score = async (req, res) => {
  if (Number.isInteger(req.body.score)) {
    //Create new score
    const score = new Score({
      email: req.user.email,
      score: req.body.score,
    });
    try {
      const savedScore = await score.save();
      res.status(200).send({
        success: true,
        message: "Score stored successfully",
      });
    } catch (err) {
      res.status(200).send({
        success: false,
        message: "Error while saving to database",
      });
    }
  } else {
    res.status(200).send({
      success: false,
      message: "Invalid datatype for score",
    });
  }
};

exports.today_scores = async (req, res) => {
  let todayDate = moment().format("DD-MM-YYYY");
  let scoresExists = await Score.find({
    $and: [{ email: req.user.email }, { createdDate: todayDate }],
  });
  if (scoresExists) {
    scoresExists = scoresExists.map(function (document) {
      return document.score;
    });
    return res.status(200).send({
      success: true,
      data: scoresExists,
      message: "Today Scores fetched successfully",
    });
  }

  return res.status(200).send({
    success: true,
    data: [],
    message: "Today Scores fetched successfully",
  });
};

exports.score_history = async (req, res) => {
  let scoresExists = await Score.find({ email: req.user.email });
  if (scoresExists) {
    let result = [];
    scoresExists.forEach((document) => {
      if (result) {
        let flag = 0;
        result.forEach((row, index) => {
          if (row.createdDate === document.createdDate) {
            result[index].scores.push(document.score);
            flag = 1;
          }
        });
        if (flag === 0) {
          result.push({
            createdDate: document.createdDate,
            scores: [document.score],
          });
        }
      } else {
        result.push({
          createdDate: document.createdDate,
          scores: [document.score],
        });
      }
    });
    return res.status(200).send({
      success: true,
      data: result,
      message: "Score history fetched successfully",
    });
  }

  return res.status(200).send({
    success: true,
    data: [],
    message: "Score history fetched successfully",
  });
};

exports.high_score = async (req, res) => {
  const scoresExists = await Score.find({ email: req.user.email }).sort({
    score: -1,
  });
  if (scoresExists.length > 0)
    return res.status(200).send({
      success: true,
      data: scoresExists[0].score,
      message: "High score fetched successfully",
    });
  return res.status(200).send({
    success: true,
    data: 0,
    message: "High score fetched successfully",
  });
};
