import React, { useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Funds = () => {
  const [balance, setBalance] = useState(18200.0);
  const [usedMargin, setUsedMargin] = useState(6380.4);
  const [showFundModal, setShowFundModal] = useState(false);
  const [modalType, setModalType] = useState("DEPOSIT");
  const [fundAmount, setFundAmount] = useState("");
  const [transactions, setTransactions] = useState([
    { id: "TXN-8801", type: "Deposit", amount: "+$5,000.00", status: "Completed", date: "Today" },
    { id: "TXN-8799", type: "Withdrawal", amount: "-$1,200.00", status: "Completed", date: "3 days ago" },
  ]);

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowFundModal(true);
  };

  const handleProcessFunds = async () => {
    const amt = parseFloat(fundAmount);
    if (!amt || amt <= 0) return;

    try {
      await axios.post(`${API_BASE}/updateFunds`, { amount: amt, type: modalType });
    } catch (e) {
      // Fallback local state execution
    }

    if (modalType === "DEPOSIT") {
      setBalance((prev) => prev + amt);
      setTransactions((prev) => [
        { id: `TXN-${Math.floor(Math.random() * 9000) + 1000}`, type: "Deposit", amount: `+$${amt.toFixed(2)}`, status: "Completed", date: "Just now" },
        ...prev,
      ]);
    } else {
      if (amt <= balance) {
        setBalance((prev) => prev - amt);
        setTransactions((prev) => [
          { id: `TXN-${Math.floor(Math.random() * 9000) + 1000}`, type: "Withdrawal", amount: `-$${amt.toFixed(2)}`, status: "Completed", date: "Just now" },
          ...prev,
        ]);
      }
    }

    setFundAmount("");
    setShowFundModal(false);
  };

  return (
    <div className="funds-container">
      <div className="funds-hero-card shadow-card">
        <div className="funds-info">
          <h3>Instant Multi-Currency Wallet & Margin Clearing</h3>
          <p>Zero-fee instant deposits via Wire, ACH, Crypto, and Card</p>
        </div>
        <div className="funds-cta-buttons">
          <button className="btn btn-green" onClick={() => handleOpenModal("DEPOSIT")}>
            Deposit Funds
          </button>
          <button className="btn btn-blue" onClick={() => handleOpenModal("WITHDRAW")}>
            Withdraw Cash
          </button>
        </div>
      </div>

      <div className="funds-grid">
        <div className="card-box shadow-card">
          <h4>Equity & Cash Margin Breakdown</h4>
          <div className="data-table">
            <div className="data-row">
              <span>Available Cash Balance</span>
              <strong className="colored-value">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </div>
            <div className="data-row">
              <span>Used Margin (Active Orders/Positions)</span>
              <strong>${usedMargin.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </div>
            <div className="data-row">
              <span>Total Account Equity</span>
              <strong>${(balance + usedMargin).toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
            </div>
            <hr />
            <div className="data-row">
              <span>Collateral Margin</span>
              <span>$0.00</span>
            </div>
            <div className="data-row">
              <span>SPAN Margin Required</span>
              <span>$0.00</span>
            </div>
            <div className="data-row">
              <span>Leverage Available</span>
              <span className="highlight-tag">5x Margin / 20x Crypto</span>
            </div>
          </div>
        </div>

        <div className="card-box shadow-card">
          <h4>Recent Treasury Transactions</h4>
          <div className="order-table mini">
            <table>
              <thead>
                <tr>
                  <th>Txn ID</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.type}</td>
                    <td className={t.type === "Deposit" ? "profit" : "loss"}>{t.amount}</td>
                    <td>
                      <span className="status-badge executed">{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showFundModal && (
        <div className="buy-window-overlay">
          <div className="buy-window-container">
            <div className="buy-window-header">
              <h3>{modalType === "DEPOSIT" ? "Deposit Funds" : "Withdraw Funds"}</h3>
              <span className="live-status">Instant Transfer</span>
            </div>
            <div className="inputs-grid" style={{ marginTop: "16px" }}>
              <div className="input-field" style={{ width: "100%" }}>
                <label>Amount ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 1000"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="buttons-group" style={{ marginTop: "20px" }}>
              <button className="btn-action buy" onClick={handleProcessFunds}>
                Confirm {modalType}
              </button>
              <button className="btn-cancel" onClick={() => setShowFundModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funds;
