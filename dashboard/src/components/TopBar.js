import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { subscribeMarketData } from "../marketDataService";

const TopBar = () => {
  const [indices, setIndices] = useState({
    sp500: { name: "S&P 500", price: 5450.3, change: "+0.45%", isDown: false },
    btc: { name: "BITCOIN", price: 65420.5, change: "+1.25%", isDown: false },
  });

  useEffect(() => {
    const unsub = subscribeMarketData((data) => {
      if (data["SPY"]) {
        setIndices((prev) => ({
          ...prev,
          sp500: {
            name: "S&P 500",
            price: (data["SPY"].price * 10).toFixed(1),
            change: data["SPY"].percentChange,
            isDown: data["SPY"].isDown,
          },
        }));
      }
      if (data["BTCUSDT"]) {
        setIndices((prev) => ({
          ...prev,
          btc: {
            name: "BITCOIN",
            price: data["BTCUSDT"].price.toLocaleString(),
            change: data["BTCUSDT"].percentChange,
            isDown: data["BTCUSDT"].isDown,
          },
        }));
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">{indices.sp500.name}</p>
          <p className="index-points">${indices.sp500.price}</p>
          <p className={`percent ${indices.sp500.isDown ? "down" : "up"}`}>
            {indices.sp500.change}
          </p>
        </div>
        <div className="sensex">
          <p className="index">{indices.btc.name}</p>
          <p className="index-points">${indices.btc.price}</p>
          <p className={`percent ${indices.btc.isDown ? "down" : "up"}`}>
            {indices.btc.change}
          </p>
        </div>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
