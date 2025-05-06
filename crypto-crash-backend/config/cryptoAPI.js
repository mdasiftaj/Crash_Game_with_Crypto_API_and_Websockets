// config/cryptoAPI.js
const axios = require('axios');
let cachedPrices = {};
let lastFetched = 0;

const fetchPrices = async () => {
  const now = Date.now();
  if (now - lastFetched < 10000 && cachedPrices) return cachedPrices;

  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    cachedPrices = {
      BTC: data.bitcoin.usd,
      ETH: data.ethereum.usd
    };
    lastFetched = now;
    return cachedPrices;
  } catch (err) {
    console.error('Failed to fetch crypto prices:', err);
    return cachedPrices;
  }
};

module.exports = fetchPrices;