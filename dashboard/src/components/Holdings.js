import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import { subscribeMarketData } from "../marketDataService";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [marketPrices, setMarketPrices] = useState({});

  useEffect(() => {
    let user = null;
    try {
      const userDataString = localStorage.getItem("userData");
      user = userDataString ? JSON.parse(userDataString) : { id: "demo-user" };
    } catch (e) {
      user = { id: "demo-user" };
    }

    const fetchHoldings = async () => {
      try {
        const res = await axios.get(`${API_BASE}/allHoldings`, {
          params: { id: user ? user.id : "demo-user" },
          withCredentials: true,
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAllHoldings(res.data);
        } else {
          setAllHoldings([
            { name: "AAPL", qty: 10, avg: 175.5, price: 189.45 },
            { name: "NVDA", qty: 15, avg: 105.0, price: 124.8 },
            { name: "BTCUSDT", qty: 0.25, avg: 58000, price: 65420.5 },
            { name: "MSFT", qty: 8, avg: 395.0, price: 442.1 },
            { name: "TSLA", qty: 12, avg: 255.0, price: 248.5 },
          ]);
        }
      } catch (error) {
        setAllHoldings([
          { name: "AAPL", qty: 10, avg: 175.5, price: 189.45 },
          { name: "NVDA", qty: 15, avg: 105.0, price: 124.8 },
          { name: "BTCUSDT", qty: 0.25, avg: 58000, price: 65420.5 },
          { name: "MSFT", qty: 8, avg: 395.0, price: 442.1 },
          { name: "TSLA", qty: 12, avg: 255.0, price: 248.5 },
        ]);
      }
    };

    fetchHoldings();

    const unsub = subscribeMarketData((data) => {
      setMarketPrices(data);
    });
    return () => unsub();
  }, []);

  const holdingsWithLive = allHoldings.map((stock) => {
    const live = marketPrices[stock.name];
    const price = live ? live.price : stock.price || stock.avg;
    const qty = stock.qty || 1;
    const avg = stock.avg || price;
    const curValue = price * qty;
    const invested = avg * qty;
    const pnl = curValue - invested;
    const pnlPct = invested ? ((pnl / invested) * 100).toFixed(2) : "0.00";

    return {
      ...stock,
      price,
      curValue,
      invested,
      pnl,
      pnlPct,
      dayChg: live ? live.percentChange : "+0.00%",
      isLoss: pnl < 0,
    };
  });

  const totalInvested = holdingsWithLive.reduce((acc, h) => acc + h.invested, 0);
  const totalCurrent = holdingsWithLive.reduce((acc, h) => acc + h.curValue, 0);
  const totalPnL = totalCurrent - totalInvested;
  const totalPnLPct = totalInvested ? ((totalPnL / totalInvested) * 100).toFixed(2) : "0.00";

  const chartData = {
    labels: holdingsWithLive.map((h) => h.name),
    datasets: [
      {
        label: "Current Holding Value ($)",
        data: holdingsWithLive.map((h) => h.curValue),
        backgroundColor: "rgba(0, 210, 255, 0.6)",
      },
    ],
  };

  return (
    <div className="holdings-container">
      <div className="page-header">
        <h3 className="title">Holdings ({holdingsWithLive.length})</h3>
        <span className="live-status">Live Pricing Active</span>
      </div>

      <div className="order-table shadow-card">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg. Cost</th>
              <th>Live Price</th>
              <th>Cur. Value</th>
              <th>P&L ($)</th>
              <th>P&L (%)</th>
              <th>24h Chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdingsWithLive.map((stock, index) => (
              <tr key={index}>
                <td className="symbol-cell">{stock.name}</td>
                <td>{stock.qty}</td>
                <td>${stock.avg.toFixed(2)}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td>${stock.curValue.toFixed(2)}</td>
                <td className={stock.pnl >= 0 ? "profit" : "loss"}>
                  {stock.pnl >= 0 ? "+" : ""}${stock.pnl.toFixed(2)}
                </td>
                <td className={stock.pnl >= 0 ? "profit" : "loss"}>
                  {stock.pnlPct}%
                </td>
                <td className={stock.isLoss ? "loss" : "profit"}>
                  {stock.dayChg}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="metrics-cards-row">
        <div className="metric-col shadow-card">
          <h5>${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Total Investment</p>
        </div>
        <div className="metric-col shadow-card">
          <h5>${totalCurrent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
          <p>Current Portfolio Value</p>
        </div>
        <div className="metric-col shadow-card">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)} ({totalPnLPct}%)
          </h5>
          <p>Total Return (P&L)</p>
        </div>
      </div>

      <div className="chart-box shadow-card">
        <h4>Asset Distribution</h4>
        <VerticalGraph data={chartData} />
      </div>
    </div>
  );
};

export default Holdings;
