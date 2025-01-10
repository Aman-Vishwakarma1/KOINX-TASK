const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  id: String,
  name: String,
  current_price: Number,
  market_cap: Number,
  change_24h: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("crypto", cryptoSchema);
