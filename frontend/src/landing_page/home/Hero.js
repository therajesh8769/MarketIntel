import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();
  const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

  return (
    <section className="hero-section">
      <div className="container text-center py-5">
        <div className="hero-badge mb-3">
          ⚡ NEXT-GEN INSTITUTIONAL-GRADE BROKERAGE & MARKET INTELLIGENCE
        </div>

        <h1 className="hero-title">
          Trade Global Markets with <span className="gradient-text">Zero Latency</span> & AI Analytics
        </h1>

        <p className="hero-subtitle">
          Execute stocks, crypto, forex, derivatives, and ETFs with ultra-low latency, real-time market streams, and AI-powered intelligence.
        </p>

        <div className="hero-actions d-flex justify-content-center gap-3 my-4">
          <button className="btn-hero-primary" onClick={() => navigate('/signup')}>
            Start Free Trading
          </button>
          <a className="btn-hero-secondary" href={dashboardUrl}>
            Live Demo Terminal
          </a>
        </div>

        <div className="hero-stats-row row justify-content-center mt-5">
          <div className="col-md-3 col-6 stat-box">
            <h3>$12.4B+</h3>
            <p>Daily Volume Executed</p>
          </div>
          <div className="col-md-3 col-6 stat-box">
            <h3>1.8M+</h3>
            <p>Active Global Traders</p>
          </div>
          <div className="col-md-3 col-6 stat-box">
            <h3>&lt; 5ms</h3>
            <p>Ultra-fast Order Matching</p>
          </div>
          <div className="col-md-3 col-6 stat-box">
            <h3>$0</h3>
            <p>Commission Equity Trades</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
