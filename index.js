const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
require("dotenv").config();

const app = express();

const fetchCryptoData = require("./services/fetchCryptoData");
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to DataBase:", err.message);
  });

(async () => {
  await fetchCryptoData();
})();

cron.schedule("0 */2 * * *", async () => {
  await fetchCryptoData();
});

app.use(require("./routes/statusRoute"));
app.use(require("./routes/metricsRoutes"));

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Server is Up and Fine !" });
});
