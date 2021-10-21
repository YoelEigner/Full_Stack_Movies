const mongoose = require("mongoose");

const MembersSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
    address: {
      street : String,
      suite: String,
      city : String,
      zipcode: String
    }
  });

module.exports = mongoose.model("members", MembersSchema);
