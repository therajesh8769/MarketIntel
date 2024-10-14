import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const userCookie = Cookies.get('user');
  
  let user=null;
  try {
    user = userCookie ? JSON.parse(userCookie) : null; // Check if user exists
  } catch (error) {
    console.error("Error parsing user from cookies:", error);
    
  }
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        console.log("please login") // Handle case where user is not logged in
        setErrorMessage("Please login to proceed");
      }
      try {
        const res = await axios.get(`http://localhost:8080/allOrders`, {params: { id: user.id },withCredentials: true,
        });
        console.log(res.data);
        // Check if the response data is an array
        if (Array.isArray(res.data)) {
          setAllOrders(res.data);
        } else {
          setAllOrders([]); // Set to empty if data isn't an array
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders."); // Handle the error
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="orders">
      {error ? ( // Handle error state
        <div className="error">
          <p>{error}</p>
          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      ) : allOrders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to="/" className="btn">
            Get started
          </Link>
        </div>
      ) : (
        <div className="order-table">
          {errorMessage && <p>{errorMessage}</p>} {/* Display error message if it exists */}
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Stock Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price}</td>
                  <td>{order.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
