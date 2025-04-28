const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  title: String,
  genre: String,
  thumbnail: String,
  iframeUrl: String,
});

module.exports = mongoose.model("Game", gameSchema);
