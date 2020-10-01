var mongoose = require("mongoose");
require("dotenv/config");

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log("DB connection successful")
);
