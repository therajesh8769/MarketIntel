import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { startMarketDataEngine, subscribeMarketData } from "./marketDataService";

const App = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    startMarketDataEngine(2000);
    const unsubscribe = subscribeMarketData((data) => {
      setResponseData(data);
    });
    return () => unsubscribe();
  }, []);

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
