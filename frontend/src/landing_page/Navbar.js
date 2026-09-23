import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subscribeMarketData, startMarketDataEngine } from '../marketDataService';
import './styles/navbar.css';

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [tickerData, setTickerData] = useState({});

  useEffect(() => {
    startMarketDataEngine(2500);
    const unsub = subscribeMarketData((data) => {
      setTickerData(data);
    });
    return () => unsub();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const dashboardUrl = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

  return (
    <header className="site-header sticky-top">
      {/* Live Market Ticker Tape */}
      <div className="ticker-bar">
        <div className="ticker-track">
          {Object.values(tickerData).map((item) => (
            <div key={item.symbol} className="ticker-item">
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-price">${item.price}</span>
              <span className={`ticker-change ${item.isDown ? 'down' : 'up'}`}>
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="brand-logo-icon">M</span>
            <span className="brand-title">MarketIntel</span>
            <span className="pro-badge">PRO</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/support">Support</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link dashboard-link" href={dashboardUrl}>
                  Launch Terminal
                </a>
              </li>

              {isLoggedIn ? (
                <li className="nav-item ms-2">
                  <button className="btn-logout" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item ms-2">
                    <Link className="btn-login" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn-signup" to="/signup">Open Account</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
