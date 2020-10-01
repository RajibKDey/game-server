const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 16,
    min: 8,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
  lastModifiedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", userSchema);
