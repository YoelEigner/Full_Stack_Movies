const mongoose = require("mongoose");

const SubscriptionsSchema = new mongoose.Schema({
  memberId: String,
  movies: { movieId: String, date: Date }
});

module.exports = mongoose.model("subscriptions", SubscriptionsSchema);
