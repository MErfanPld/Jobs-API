const mongoose = require("mongoose");

connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connect To DB ...");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
