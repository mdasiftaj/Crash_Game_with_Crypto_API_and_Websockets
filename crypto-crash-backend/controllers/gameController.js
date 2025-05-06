// controllers/gameController.js
const GameRound = require('../models/GameRound');
const Player = require('../models/Player');
const Transaction = require('../models/Transaction');
const fetchPrices = require('../config/cryptoAPI');
const { generateHash, generateTransactionHash } = require('../utils/transactionUtils');

exports.placeBet = async (req, res) => {
  const { playerId, usdAmount, currency } = req.body;
  try {
    const prices = await fetchPrices();
    const cryptoAmount = usdAmount / prices[currency];

    const player = await Player.findById(playerId);
    if (!player || player.wallet[currency] < cryptoAmount) return res.status(400).json({ error: 'Insufficient balance' });

    player.wallet[currency] -= cryptoAmount;
    await player.save();

    const transaction = await Transaction.create({
      playerId,
      usdAmount,
      cryptoAmount,
      currency,
      transactionType: 'bet',
      transactionHash: generateTransactionHash(),
      priceAtTime: prices[currency]
    });

    res.status(200).json({ message: 'Bet placed', transaction });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.cashOut = async (req, res) => {
  const { playerId, cryptoAmount, currency, multiplier } = req.body;
  try {
    const prices = await fetchPrices();
    const payout = cryptoAmount * multiplier;

    const player = await Player.findById(playerId);
    player.wallet[currency] += payout;
    await player.save();

    const transaction = await Transaction.create({
      playerId,
      usdAmount: payout * prices[currency],
      cryptoAmount: payout,
      currency,
      transactionType: 'cashout',
      transactionHash: generateTransactionHash(),
      priceAtTime: prices[currency]
    });

    res.status(200).json({ message: 'Cashout successful', transaction });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
