// models/GameRound.js
const mongoose = require('mongoose');

const gameRoundSchema = new mongoose.Schema({
  roundId: String,
  startTime: Date,
  crashPoint: Number,
  seed: String,
  hash: String,
  bets: [
    {
      playerId: mongoose.Schema.Types.ObjectId,
      crypto: String,
      amount: Number,
      usdAmount: Number,
      cashedOut: Boolean,
      multiplierAtCashout: Number
    }
  ]
});

module.exports = mongoose.model('GameRound', gameRoundSchema);