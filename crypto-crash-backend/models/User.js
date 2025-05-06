// // models/User.js
// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   balance: { type: Number, default: 1000 },
//   gamesPlayed: { type: Number, default: 0 },
//   totalWon: { type: Number, default: 0 },
// });

// module.exports = mongoose.model("User", UserSchema);


// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  balance: { type: Number, default: 1000 },
  gamesPlayed: { type: Number, default: 0 },
  totalWon: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", UserSchema);
