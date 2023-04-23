const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const cache = new Map();
const CACHE_TIME_MS = 2 * 60 * 1000; // 2 minutes

const fetchEnlightenedTrades = async () => {
  const EXCHANGE_API_URL =
    "https://www.pathofexile.com/api/trade/exchange/Crucible";
  const exchangeRequestConfig = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: {
        status: { option: "online" },
        have: ["chaos"],
        want: ["the-enlightened"],
        minimum: 2,
      },
      sort: { have: "asc" },
      engine: "new",
    }),
  };

  const response = await fetch(EXCHANGE_API_URL, exchangeRequestConfig);

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

const getCachedTrades = () => {
  const cachedData = cache.get("trades");
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_TIME_MS) {
    return cachedData.data;
  }
  return null;
};

const setCachedTrades = (data) => {
  cache.set("trades", { data, timestamp: Date.now() });
};

app.get("/api/", async (req, res) => {
  try {
    let trades = getCachedTrades();
    if (!trades) {
      trades = await fetchEnlightenedTrades();
      setCachedTrades(trades);
    }
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
