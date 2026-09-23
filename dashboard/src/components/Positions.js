import React, { useState, useEffect } from "react";
import axios from "axios";
import { subscribeMarketData } from "../marketDataService";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [marketPrices, setMarketPrices] = useState({});

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await axios.get(`${API_BASE}/allPositions`, { withCredentials: true });
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAllPositions(res.data);
        } else {
          setAllPositions([
            { product: "MAR", name: "GOOGL", qty: 20, avg: 168.5, price: 178.3 },
            { product: "MIS", name: "AMZN", qty: 15, avg: 180.2, price: 186.2 },
            { product: "CNC", name: "SOLUSDT", qty: 10, avg: 135.0, price: 148.75 },
          ]);
        }
      } catch (err) {
        setAllPositions([
          { product: "MAR", name: "GOOGL", qty: 20, avg: 168.5, price: 178.3 },
          { product: "MIS", name: "AMZN", qty: 15, avg: 180.2, price: 186.2 },
          { product: "CNC", name: "SOLUSDT", qty: 10, avg: 135.0, price: 148.75 },
        ]);
      }
    };

    fetchPositions();

    const unsub = subscribeMarketData((data) => {
      setMarketPrices(data);
    });
    return () => unsub();
  }, []);

  const handleClosePosition = async (name) => {
    try {
      await axios.post(`${API_BASE}/closePosition`, { name });
    } catch (e) {
      // fallback local update
    }
    setAllPositions((prev) => prev.filter((p) => p.name !== name));
  };

  const positionsWithLive = allPositions.map((pos) => {
    const live = marketPrices[pos.name];
    const ltp = live ? live.price : pos.price || pos.avg;
    const curValue = ltp * pos.qty;
    const invested = pos.avg * pos.qty;
    const pnl = curValue - invested;
    return {
      ...pos,
      ltp,
      curValue,
      pnl,
      dayChg: live ? live.percentChange : "+0.00%",
    };
  });

  return (
    <div className="positions-container">
      <div className="page-header">
        <h3 className="title">Active Positions ({positionsWithLive.length})</h3>
        <span className="live-status">Real-time MTM P&L Engine</span>
      </div>

      <div className="order-table shadow-card">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg. Price</th>
              <th>LTP</th>
              <th>P&L ($)</th>
              <th>24h Chg</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {positionsWithLive.map((pos, index) => (
              <tr key={index}>
                <td>
                  <span className="type-badge">{pos.product}</span>
                </td>
                <td className="symbol-cell">{pos.name}</td>
                <td>{pos.qty}</td>
                <td>${pos.avg.toFixed(2)}</td>
                <td>${pos.ltp.toFixed(2)}</td>
                <td className={pos.pnl >= 0 ? "profit" : "loss"}>
                  {pos.pnl >= 0 ? "+" : ""}${pos.pnl.toFixed(2)}
                </td>
                <td className={pos.pnl >= 0 ? "profit" : "loss"}>{pos.dayChg}</td>
                <td>
                  <button
                    className="close-pos-btn"
                    onClick={() => handleClosePosition(pos.name)}
                  >
                    Close Position
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Positions;
