import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios"; // Import axios
import "./index.css";
import Home from "./components/Home";

const App = () => {
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors
  const [responseData, setResponseData] = useState(null); // State for storing API response data

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const companies = ["AAPL", "GOOGL"];
        const apiKey = process.env.REACT_APP_API_KEY;
        //process.env.REACT_APP_API_KEY;
        console.log(apiKey);
        const symbols = companies.join(",");

        const response = await axios.get(
          `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=1day&apikey=${apiKey}`
        );

        const data = response.data;
        setResponseData(data); // Store the response data in state
        console.log(data);
      } catch (err) {
        setError("Error fetching stock data"); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchStockData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home responseData={responseData} />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
