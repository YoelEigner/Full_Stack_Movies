const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  name: String,
  genres: [String],
  image: { medium: String, original: String },
  premiered: Date,
});

module.exports = mongoose.model("movies", MoviesSchema);
