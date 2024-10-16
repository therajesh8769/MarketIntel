import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const { closeBuyWindow } = useContext(GeneralContext); 

  let user = null;

  try {
    const userDataString = localStorage.getItem('userData');
    user = userDataString ? JSON.parse(userDataString) : null;
    //window.location.href = 'https://marketintel1r6w.onrender.com/login';
  } catch (error) {
    console.error("Error parsing user from cookies:", error);
  }
  if (!user) {
    console.log("user dont exits") // Don't fetch holdings if the user is not logged in
  }

  
  const userId = user.id;
  const handleBuyClick = async() => {

    await axios.post("https://marketintel-2r6w.onrender.com/newOrder", {
      userId:userId,
      name: uid,
      qty: stockQuantity,
      price: stockPrice,
      mode: "BUY",
    }
 
  );
    
    closeBuyWindow();
    
  };

  const handleCancelClick = () => {
   closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
