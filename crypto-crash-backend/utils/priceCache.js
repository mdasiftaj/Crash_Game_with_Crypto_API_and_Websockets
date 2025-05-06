// utils/priceCache.js
let priceCache = {};
let lastTime = 0;

exports.cachePrice = (priceData) => {
  lastTime = Date.now();
  priceCache = priceData;
};

exports.getCachedPrice = () => {
  if (Date.now() - lastTime < 10000) return priceCache;
  return null;
};