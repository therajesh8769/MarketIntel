/**
 * MarketDataService for Frontend Landing Page
 */
import axios from "axios";

const DEFAULT_SYMBOLS = [
  { symbol: "BTCUSDT", name: "Bitcoin", type: "crypto", basePrice: 65420.5 },
  { symbol: "ETHUSDT", name: "Ethereum", type: "crypto", basePrice: 3480.2 },
  { symbol: "AAPL", name: "Apple", type: "stock", basePrice: 189.45 },
  { symbol: "NVDA", name: "NVIDIA", type: "stock", basePrice: 124.8 },
  { symbol: "TSLA", name: "Tesla", type: "stock", basePrice: 248.5 },
  { symbol: "MSFT", name: "Microsoft", type: "stock", basePrice: 442.1 },
];

let marketCache = {};
let listeners = [];
let tickInterval = null;

DEFAULT_SYMBOLS.forEach((item) => {
  marketCache[item.symbol] = {
    symbol: item.symbol,
    name: item.name,
    price: item.basePrice,
    open: item.basePrice * 0.99,
    change: "+1.01%",
    isDown: false,
  };
});

export const startMarketDataEngine = (intervalMs = 2500) => {
  if (tickInterval) clearInterval(tickInterval);
  tickInterval = setInterval(() => {
    Object.keys(marketCache).forEach((sym) => {
      const item = marketCache[sym];
      const delta = (Math.random() - 0.49) * 0.002;
      item.price = Math.max(0.1, parseFloat((item.price * (1 + delta)).toFixed(2)));
      const diff = item.price - item.open;
      const pct = (diff / item.open) * 100;
      item.change = (pct >= 0 ? "+" : "") + pct.toFixed(2) + "%";
      item.isDown = pct < 0;
    });
    listeners.forEach((fn) => fn({ ...marketCache }));
  }, intervalMs);
};

export const subscribeMarketData = (callback) => {
  listeners.push(callback);
  callback({ ...marketCache });
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
};

export const getMarketSnapshot = () => ({ ...marketCache });
