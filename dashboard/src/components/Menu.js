import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    
    

    try {
      const localUserData = localStorage.getItem('userData');
      if (localUserData) {
        const userData = JSON.parse(localUserData);
        setUser(userData);
        console.log("User data loaded from localStorage:", userData);
      } else {
        console.log("No user data found in localStorage");
        // Optionally redirect to login
        // window.location.href = 'https://marketintel1.onrender.com/login';
      }
    } catch (error) {
      console.error("Error parsing localStorage user data:", error);
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
      // Make API call to logout
      await axios.post('https://marketintel-2r6w.onrender.com/logout');
      
      // Clear localStorage
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      
      // Redirect (corrected Window to window)
      window.location.href = "https://marketintel1.onrender.com";
    } catch (error) {
      console.error('Logout failed:', error);
      setErrorMessage("Logout failed");
      
      // Even if API call fails, clear local storage and redirect
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      window.location.href = "https://marketintel1.onrender.com";
    }
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className='menu-container'>
      <h2 style={{color:"#2a9df4", fontFamily:"PT Serif"}}>MarketIntel</h2>
      <div className='menus'>
        {errorMessage && <p>{errorMessage}</p>}
        <ul>
          {[
            { path: "/", label: "Dashboard" },
            { path: "/orders", label: "Orders" },
            { path: "/holdings", label: "Holdings" },
            { path: "/positions", label: "Positions" },
            { path: "/funds", label: "Funds" },
            { path: "/apps", label: "Apps" },
          ].map((item, index) => (
            <li key={item.path}>
              <Link
                style={{ textDecoration: "none" }}
                to={item.path}
                onClick={() => handleMenuClick(index)}
              >
                <p className={selectedMenu === index ? activeMenuClass : menuClass}>
                  {item.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">
            {user? user.username.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
        <button 
          className="logout-btn" 
          onClick={handleLogout} 
          style={{color:"blue", backgroundColor:"white", border:"none"}}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Menu;