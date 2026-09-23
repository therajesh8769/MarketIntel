import React, { useEffect, useState } from "react";
import { subscribeMarketData, getChartData } from "../marketDataService";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Summary = () => {
  const [user, setUser] = useState({ username: "Trader", email: "trader@marketintel.io" });
  const [marketData, setMarketData] = useState({});
  const [selectedTimeframe, setSelectedTimeframe] = useState("1M");
  const [activeSymbol, setActiveSymbol] = useState("BTCUSDT");

  useEffect(() => {
    try {
      const localUserData = localStorage.getItem("userData");
      if (localUserData) {
        setUser(JSON.parse(localUserData));
      }
    } catch (e) {
      // fallback
    }

    const unsub = subscribeMarketData((data) => {
      setMarketData(data);
    });
    return () => unsub();
  }, []);

  const history = getChartData(activeSymbol, selectedTimeframe);
  const activeAsset = marketData[activeSymbol] || { price: 65420.5, percentChange: "+1.25%", isDown: false };

  const chartDataConfig = {
    labels: history.map((item) => item.time),
    datasets: [
      {
        label: `${activeSymbol} Price ($)`,
        data: history.map((item) => item.price),
        fill: true,
        backgroundColor: activeAsset.isDown ? "rgba(255, 23, 68, 0.15)" : "rgba(0, 230, 118, 0.15)",
        borderColor: activeAsset.isDown ? "#ff1744" : "#00e676",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "#1e293b",
        titleColor: "#f8fafc",
        bodyColor: "#00d2ff",
      },
    },
    scales: {
      x: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#94a3b8" } },
      y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { color: "#94a3b8" } },
    },
  };

  return (
    <div className="summary-page">
      <div className="welcome-banner">
        <div>
          <h2>Welcome back, {user.username}!</h2>
          <p className="subtitle">Live Portfolio Performance & Real-Time Trading Terminal</p>
        </div>
        <div className="status-badge live">LIVE MARKET DATA</div>
      </div>

      <div className="summary-cards-grid">
        <div className="stat-card shadow-card">
          <span className="card-label">Equity & Margin</span>
          <h3>$24,580.40</h3>
          <div className="card-sub">
            <span>Available Margin: <strong className="text-green">$18,200.00</strong></span>
            <span>Used Margin: <strong>$6,380.40</strong></span>
          </div>
        </div>

        <div className="stat-card shadow-card">
          <span className="card-label">Total Portfolio Value</span>
          <h3>$48,920.15</h3>
          <div className="card-sub">
            <span>Unrealized P&L: <strong className="profit">+$3,450.80 (+7.58%)</strong></span>
            <span>Day P&L: <strong className="profit">+$620.40 (+1.28%)</strong></span>
          </div>
        </div>

        <div className="stat-card shadow-card">
          <span className="card-label">Active Symbol</span>
          <h3>{activeSymbol}</h3>
          <div className="card-sub">
            <span>Price: <strong>${typeof activeAsset.price === "number" ? activeAsset.price.toLocaleString() : activeAsset.price}</strong></span>
            <span>24h Chg: <strong className={activeAsset.isDown ? "loss" : "profit"}>{activeAsset.percentChange}</strong></span>
          </div>
        </div>
      </div>

      {/* Interactive Chart Section */}
      <div className="chart-section shadow-card">
        <div className="chart-header">
          <div className="symbol-selector">
            {["BTCUSDT", "ETHUSDT", "AAPL", "NVDA", "TSLA", "MSFT"].map((sym) => (
              <button
                key={sym}
                className={activeSymbol === sym ? "sym-btn active" : "sym-btn"}
                onClick={() => setActiveSymbol(sym)}
              >
                {sym}
              </button>
            ))}
          </div>

          <div className="timeframe-selector">
            {["1D", "1W", "1M", "1Y", "ALL"].map((tf) => (
              <button
                key={tf}
                className={selectedTimeframe === tf ? "tf-btn active" : "tf-btn"}
                onClick={() => setSelectedTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-wrapper" style={{ height: "320px" }}>
          <Line data={chartDataConfig} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
