const Crypto = require("../model/cryptoData");

exports.stats = async (req, res, next) => {
  const { coin } = req.query;
  if (!coin || !["bitcoin", "matic-network", "ethereum"].includes(coin)) {
    return res
      .status(400)
      .json({
        error:
          "Currently have data for bitcoin, matic-network and ethereum or missing coin parameter.",
      });
  }

  try {
    const latestRecord = await Crypto.findOne({ id: coin }).sort({
      timestamp: -1,
    });

    if (!latestRecord) {
      return res.status(404).json({ error: `No data found for ${coin}.` });
    }
    return res.json({
      price: latestRecord.current_price,
      marketCap: latestRecord.market_cap,
      "24hChange": latestRecord.change_24h,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};
