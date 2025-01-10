const Crypto = require("../model/cryptoData");

function getStandardDeviation(array) {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  );
}

exports.deviation = async (req, res, next) => {
  const { coin } = req.query;

  if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
    return res
      .status(400)
      .json({ error: "Invalid or missing coin parameter." });
  }

  try {
    const records = await Crypto.find({ id: coin })
      .sort({ timestamp: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ error: `No records found for ${coin}.` });
    }

    const prices = records.map((record) => record.current_price);
    console.log(prices);
    const deviation = getStandardDeviation(prices);

    return res.json({ deviation });
  } catch (error) {
    console.error("Error calculating deviation:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
