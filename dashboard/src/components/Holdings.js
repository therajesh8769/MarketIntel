import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";
import Cookies from "js-cookie";

const Holdings = ({ responseData }) => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(responseData,"response data in hold");

  useEffect(() => {
    const userCookie = Cookies.get("user");
    let user = null;

    try {
      user = userCookie ? JSON.parse(userCookie) : null;
    } catch (error) {
      console.error("Error parsing user from cookies:", error);
    }

    if (!user) {
      setErrorMessage("Please login to proceed");
      return;
    }

    const fetchHoldings = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/allHoldings`, {
          params: { id: user.id },
          withCredentials: true,

        }); 
        

        // Ensure the response data is an array
        if (Array.isArray(res.data)) {
          setAllHoldings(res.data);
          console.log("Fetched holdings:", res.data); 
        } else {
          setAllHoldings([]);
        }
      } catch (error) {
        console.error("Error fetching holdings:", error);
        setAllHoldings([]); // Set to empty on error
      }
    };

    fetchHoldings();
  }, []); // Only run once on mount, not based on `user` changing.

  useEffect(() => {
    if (responseData && allHoldings.length > 0) {
      const updatedHoldings = Object.keys(responseData).map((symbol) => {
        const stock = responseData[symbol];
        const latestPrice = stock.values[0].close;
        const holding = allHoldings.find((h) => h.name === symbol) || {}; // Default to an empty object if no match
        const quantity = holding.qty || 0;
        const avgCost = holding.avg || 0;
        const currentValue = latestPrice * quantity;
        const netChange = (latestPrice - avgCost) * quantity;
        const dayChange = stock.values[0].close - stock.values[1].close;

        return {
          name: symbol,
          qty: quantity,
          avg: avgCost,
          price: latestPrice,
          currentValue,
          net: netChange.toFixed(2),
          day: dayChange.toFixed(2),
          isLoss: dayChange < 0,
        };
      });

      setAllHoldings(updatedHoldings);
    }
  }, [responseData]); // Only update when responseData changes

  const labels = allHoldings.map((subArray) => subArray["name"] || "");
  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price || 0),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        {errorMessage && <p>{errorMessage}</p>}
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price && stock.qty ? stock.price * stock.qty : 0;
              const isProfit = curValue - (stock.avg && stock.qty ? stock.avg * stock.qty : 0) >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              const price = typeof stock.price === "number" ? stock.price.toFixed(2) : "0.00";
              const avgCost = typeof stock.avg === "number" ? stock.avg.toFixed(2) : "0.00";
              const curValDisplay = typeof curValue === "number" ? curValue.toFixed(2) : "0.00";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{avgCost}</td>
                  <td>{price}</td>
                  <td>{curValDisplay}</td>
                  <td className={profClass}>
                    {(curValue - (stock.avg && stock.qty ? stock.avg * stock.qty : 0)).toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>29,875.<span>55</span></h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>31,428.<span>95</span></h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
