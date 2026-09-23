import React, { useState, useEffect, useContext } from "react";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz, SearchOutlined } from "@mui/icons-material";
import { DoughnutChart } from "./DoughnoutChart";
import GeneralContext from "./GeneralContext";
import { subscribeMarketData, searchMarketSymbols } from "../marketDataService";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const unsub = subscribeMarketData((data) => {
      const items = Object.values(data);
      if (searchQuery) {
        setWatchlist(searchMarketSymbols(searchQuery));
      } else {
        setWatchlist(items);
      }
    });
    return () => unsub();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    setWatchlist(searchMarketSymbols(q));
  };

  const chartLabels = watchlist.slice(0, 6).map((item) => item.symbol);
  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Price ($)",
        data: watchlist.slice(0, 6).map((item) => item.price),
        backgroundColor: [
          "rgba(0, 210, 255, 0.7)",
          "rgba(114, 9, 183, 0.7)",
          "rgba(0, 230, 118, 0.7)",
          "rgba(255, 171, 0, 0.7)",
          "rgba(255, 23, 68, 0.7)",
          "rgba(156, 39, 176, 0.7)",
        ],
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <SearchOutlined className="search-icon" />
        <input
          type="text"
          name="search"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search BTC, AAPL, NVDA..."
          className="search"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock) => (
          <WatchListItem stock={stock} key={stock.symbol} />
        ))}
      </ul>

      <div className="watchlist-chart">
        <h4>Top Assets Snapshot</h4>
        <DoughnutChart data={chartData} />
      </div>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="watchlist-item-row"
    >
      <div className="item">
        <div className="stock-info">
          <p className="stock-symbol">{stock.symbol}</p>
          <span className="stock-category">{stock.category || stock.type}</span>
        </div>
        <div className="itemInfo">
          <span className={`percent ${stock.isDown ? "down" : "up"}`}>
            {stock.percentChange}
          </span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down icon-arrow" />
          ) : (
            <KeyboardArrowUp className="up icon-arrow" />
          )}
          <span className="price">${typeof stock.price === "number" ? stock.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : stock.price}</span>
        </div>
      </div>
      {showActions && <WatchListActions uid={stock.symbol} price={stock.price} />}
    </li>
  );
};

const WatchListActions = ({ uid, price }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid, price, "BUY");
  };

  const handleSellClick = () => {
    generalContext.openBuyWindow(uid, price, "SELL");
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>Buy</button>
        </Tooltip>
        <Tooltip title="Sell" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={handleSellClick}>Sell</button>
        </Tooltip>
        <Tooltip title="Analytics" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
