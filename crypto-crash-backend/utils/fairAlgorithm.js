// utils/fairAlgorithm.js
const crypto = require('crypto');

exports.generateCrashPoint = (seed, round) => {
  const hash = crypto.createHash('sha256').update(seed + round).digest('hex');
  const num = parseInt(hash.substring(0, 8), 16);
  return Math.max(1, Math.min(120, (num % 10000) / 100));
};