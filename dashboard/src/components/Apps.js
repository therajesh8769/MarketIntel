import React, { useState } from "react";

const Apps = () => {
  const [selectedAsset, setSelectedAsset] = useState("BTCUSDT");

  const aiInsights = {
    BTCUSDT: {
      sentiment: "Bullish (88%)",
      summary: "Bitcoin exhibits strong accumulation above $64,000 support level. On-chain metrics highlight decreasing exchange reserves.",
      signals: ["RSI (14): 62.4 (Neutral/Bullish)", "MACD: Bullish Crossover", "200 EMA: Strong Support"],
    },
    AAPL: {
      sentiment: "Moderately Bullish (72%)",
      summary: "Apple stock consolidating near all-time high following strong hardware pre-orders and services growth.",
      signals: ["RSI (14): 58.1", "Volume Profile: Institutional Buying", "Key Resistance: $195.00"],
    },
    NVDA: {
      sentiment: "Extremely Bullish (94%)",
      summary: "NVIDIA dominates AI chip market with expanding datacenter revenue backlog and sustained demand.",
      signals: ["RSI (14): 71.0", "SMA 50: Upward Trend", "Breakout Target: $140.00"],
    },
  };

  const insight = aiInsights[selectedAsset] || aiInsights["BTCUSDT"];

  return (
    <div className="apps-container">
      <div className="page-header">
        <h3 className="title">AI Market Intelligence & Broker Apps</h3>
        <span className="live-status">AIEO & Predictive Analytics</span>
      </div>

      <div className="apps-grid">
        <div className="ai-card shadow-card">
          <div className="card-header-row">
            <h4>AI Predictive Sentiment Engine</h4>
            <select
              className="asset-dropdown"
              value={selectedAsset}
              onChange={(e) => setSelectedAsset(e.target.value)}
            >
              <option value="BTCUSDT">Bitcoin (BTC)</option>
              <option value="AAPL">Apple (AAPL)</option>
              <option value="NVDA">NVIDIA (NVDA)</option>
            </select>
          </div>

          <div className="sentiment-meter-box">
            <span className="sentiment-title">Market Sentiment:</span>
            <strong className="sentiment-badge">{insight.sentiment}</strong>
          </div>

          <p className="ai-description">{insight.summary}</p>

          <div className="signals-list">
            <h5>Technical Indicators & Signals:</h5>
            <ul>
              {insight.signals.map((sig, i) => (
                <li key={i}>{sig}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ai-card shadow-card">
          <h4>Broker Ecosystem Apps</h4>
          <div className="app-list">
            <div className="app-item">
              <div className="app-icon">📈</div>
              <div>
                <h5>Kite Connect API</h5>
                <p>Build custom algorithmic trading bots and automated strategy webhooks.</p>
              </div>
            </div>
            <div className="app-item">
              <div className="app-icon">🤖</div>
              <div>
                <h5>Streak Algorithmic Scanner</h5>
                <p>Backtest and deploy trading algorithms without writing code.</p>
              </div>
            </div>
            <div className="app-item">
              <div className="app-icon">📊</div>
              <div>
                <h5>Sensibull Options Terminal</h5>
                <p>Options trading strategies, open interest analysis, and pay-off graphs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apps;
