// controllers/walletController.js
const Player = require('../models/Player');
const fetchPrices = require('../config/cryptoAPI');

exports.getWallet = async (req, res) => {
  try {
    const player = await Player.findById(req.params.playerId);
    const prices = await fetchPrices();
    const usdBalances = {
      BTC: player.wallet.BTC * prices.BTC,
      ETH: player.wallet.ETH * prices.ETH
    };
    res.status(200).json({ wallet: player.wallet, usdEquivalent: usdBalances });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
