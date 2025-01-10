const axios = require("axios");
const Crypto = require("../model/cryptoData");

const fetchCryptoData = async () => {
  try {
    const { data } = await axios.get(process.env.COINGECKO_API, {
      params: {
        ids: "bitcoin,matic-network,ethereum",
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    const cryptoData = [
      { id: "bitcoin", ...data.bitcoin },
      { id: "matic-network", ...data["matic-network"] },
      { id: "ethereum", ...data.ethereum },
    ];

    for (const crypto of cryptoData) {
      const newRecord = {
        id: crypto.id,
        name: crypto.id,
        current_price: crypto.usd,
        market_cap: crypto.usd_market_cap,
        change_24h: crypto.usd_24h_change,
        timestamp: new Date(),
      };
      await Crypto.create(newRecord);
    }
  } catch (error) {
    throw new Error("fetching crypto data:", error.message);
  }
};

module.exports = fetchCryptoData;
