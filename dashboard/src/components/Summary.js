import React from "react";
import { useEffect, useState } from 'react';


const Summary = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get user data from URL first
    const params = new URLSearchParams(window.location.search);
    const urlUserData = params.get('userData');

    if (urlUserData) {
      try {
        // Parse URL data and save to localStorage
        const userData = JSON.parse(decodeURIComponent(urlUserData));
        localStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        
        // Clean up URL after getting data
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error("Error parsing URL user data:", error);
      }
    }

    // If no URL data, try localStorage
    if (!urlUserData) {
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
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  

  // Now you can use user.id, user.email, user.username
  
   













  return (
    <>
    
      <div className="username">
        <h6>Hi, {user? user.username:'User'}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>{" "}
            </p>
            <p>
              Opening balance <span>3.74k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>31.43k</span>{" "}
            </p>
            <p>
              Investment <span>29.88k</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
