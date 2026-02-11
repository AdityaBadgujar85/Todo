const mongoose = require("mongoose");

function DBconnection() {
  const DB_URL = process.env.MONGO_URI;

  mongoose.connect(DB_URL).then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.error("connection error", error.message);
    });
}

module.exports = DBconnection;
