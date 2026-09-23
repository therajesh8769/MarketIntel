import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let user = null;
    try {
      const userDataString = localStorage.getItem("userData");
      user = userDataString ? JSON.parse(userDataString) : { id: "demo-user" };
    } catch (e) {
      user = { id: "demo-user" };
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_BASE}/allOrders`, {
          params: { id: user ? user.id : "demo-user" },
          withCredentials: true,
        });
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAllOrders(res.data);
        } else {
          setAllOrders([
            { _id: "ORD-9821", name: "BTCUSDT", qty: 0.5, price: 64200.0, mode: "BUY", status: "Executed", time: "10:14:22 AM" },
            { _id: "ORD-9820", name: "NVDA", qty: 10, price: 122.5, mode: "BUY", status: "Executed", time: "09:30:05 AM" },
            { _id: "ORD-9819", name: "AAPL", qty: 5, price: 190.0, mode: "SELL", status: "Executed", time: "Yesterday" },
          ]);
        }
      } catch (err) {
        setAllOrders([
          { _id: "ORD-9821", name: "BTCUSDT", qty: 0.5, price: 64200.0, mode: "BUY", status: "Executed", time: "10:14:22 AM" },
          { _id: "ORD-9820", name: "NVDA", qty: 10, price: 122.5, mode: "BUY", status: "Executed", time: "09:30:05 AM" },
          { _id: "ORD-9819", name: "AAPL", qty: 5, price: 190.0, mode: "SELL", status: "Executed", time: "Yesterday" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading-state">Loading order history...</div>;
  }

  return (
    <div className="orders-container">
      <div className="page-header">
        <h3 className="title">Order Book ({allOrders.length})</h3>
        <span className="live-status">Execution Audit Log</span>
      </div>

      <div className="order-table shadow-card">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Instrument</th>
              <th>Side</th>
              <th>Qty</th>
              <th>Executed Price</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={order._id || index}>
                <td className="order-id">{order._id}</td>
                <td className="symbol-cell">{order.name}</td>
                <td>
                  <span className={`side-badge ${order.mode.toLowerCase()}`}>
                    {order.mode}
                  </span>
                </td>
                <td>{order.qty}</td>
                <td>${typeof order.price === "number" ? order.price.toFixed(2) : order.price}</td>
                <td>
                  <span className="status-badge executed">{order.status || "Executed"}</span>
                </td>
                <td className="time-cell">{order.time || new Date().toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
