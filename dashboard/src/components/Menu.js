import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const localUserData = localStorage.getItem('userData');
      if (localUserData) {
        setUser(JSON.parse(localUserData));
      } else {
        // Fallback demo user if not logged in
        setUser({ username: "TraderPro", email: "trader@marketintel.io" });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.warn("Logout endpoint unreachable, clearing session locally");
    } finally {
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      window.location.href = "http://localhost:3000";
    }
  };

  return (
    <div className='menu-container'>
      <div className="brand-logo">
        <span className="brand-badge">PRO</span>
        <h2 style={{ color: "#00d2ff", fontFamily: "Inter, sans-serif", fontWeight: 700, margin: 0 }}>
          MarketIntel
        </h2>
      </div>

      <div className='menus'>
        <ul>
          {[
            { path: "/", label: "Dashboard" },
            { path: "/orders", label: "Orders" },
            { path: "/holdings", label: "Holdings" },
            { path: "/positions", label: "Positions" },
            { path: "/funds", label: "Funds" },
            { path: "/apps", label: "Apps & AI" },
          ].map((item, index) => (
            <li key={item.path}>
              <Link
                style={{ textDecoration: "none" }}
                to={item.path}
                onClick={() => handleMenuClick(index)}
              >
                <p className={selectedMenu === index ? "menu selected" : "menu"}>
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">
            {user ? user.username.charAt(0).toUpperCase() : 'T'}
          </div>
          <span className="profile-name">{user ? user.username : 'Trader'}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;
