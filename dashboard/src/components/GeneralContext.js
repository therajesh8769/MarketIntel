import React, { useState } from "react";
import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price, mode) => {},
  closeBuyWindow: () => {},
  watchlist: [],
  setWatchlist: (newWatchlist) => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [initialPrice, setInitialPrice] = useState(0);
  const [orderMode, setOrderMode] = useState("BUY");
  const [watchlist, setWatchlist] = useState([]);

  const handleOpenBuyWindow = (uid, price = 0, mode = "BUY") => {
    setSelectedStockUID(uid);
    setInitialPrice(price);
    setOrderMode(mode);
    setIsBuyWindowOpen(true);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        watchlist,
        setWatchlist,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          initialPrice={initialPrice}
          initialMode={orderMode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
