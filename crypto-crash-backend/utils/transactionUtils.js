// utils/transactionUtils.js
exports.generateTransactionHash = () => {
  return 'tx_' + Math.random().toString(36).substring(2, 15);
};

exports.generateHash = (seed, round) => {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(seed + round).digest('hex');
};