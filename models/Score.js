const mongoose = require("mongoose");
const moment = require("moment");

const scoreSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  score: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: String,
    default: moment().format("DD-MM-YYYY"),
  },
});

module.exports = mongoose.model("scores", scoreSchema);
