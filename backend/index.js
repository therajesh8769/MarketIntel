const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { updateHoldings } = require("./holdingsController");
const authRoute = require("./Routes/AuthRoute");

const app = express();
const PORT = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

let isDbConnected = false;

if (uri) {
  mongoose
    .connect(uri)
    .then(() => {
      isDbConnected = true;
      console.log("MongoDB connection success");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
    });
} else {
  console.log("No MONGO_URL specified; running in fallback mode.");
}

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Strict CORS configuration for credentials
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",
  "https://marketintel1.onrender.com",
  "https://dashboard-hj5i.onrender.com",
];

if (process.env.CLIENT_ORIGIN) {
  allowedOrigins.push(process.env.CLIENT_ORIGIN);
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS origin not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/", authRoute);

// Holdings Endpoint
app.get("/allHoldings", async (req, res) => {
  try {
    const userId = req.query.id;
    if (isDbConnected && userId) {
      let allHoldings = await HoldingsModel.find({ userId }).populate("userId");
      return res.json(allHoldings);
    }
    return res.json([
      { name: "AAPL", qty: 10, avg: 175.5, price: 189.3, net: "+7.86%", day: "+1.25%", isLoss: false },
      { name: "NVDA", qty: 5, avg: 420.0, price: 495.2, net: "+17.90%", day: "+3.40%", isLoss: false },
      { name: "TSLA", qty: 15, avg: 245.0, price: 238.1, net: "-2.81%", day: "-0.95%", isLoss: true },
      { name: "MSFT", qty: 8, avg: 380.0, price: 415.5, net: "+9.34%", day: "+0.80%", isLoss: false },
      { name: "BTC", qty: 0.5, avg: 52000, price: 64200, net: "+23.46%", day: "+2.10%", isLoss: false },
    ]);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

// Positions Endpoint
app.get("/allPositions", async (req, res) => {
  try {
    if (isDbConnected) {
      let allPositions = await PositionsModel.find();
      return res.json(allPositions);
    }
    return res.json([
      { product: "CNC", name: "GOOGL", qty: 4, avg: 140.2, price: 152.8, net: "+8.98%", day: "+1.10%", isLoss: false },
      { product: "MIS", name: "AMZN", qty: 12, avg: 172.0, price: 178.5, net: "+3.77%", day: "+0.90%", isLoss: false },
    ]);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

// Close Position Endpoint
app.post("/closePosition", async (req, res) => {
  try {
    const { name } = req.body;
    if (isDbConnected && name) {
      await PositionsModel.deleteOne({ name });
    }
    res.json({ success: true, message: `Position ${name} closed successfully` });
  } catch (err) {
    console.error("Error closing position:", err);
    res.status(500).json({ error: "Failed to close position" });
  }
});

// New Order Endpoint
app.post("/newOrder", async (req, res) => {
  try {
    const { userId, name, qty, price, mode } = req.body;
    if (isDbConnected) {
      let newOrder = new OrdersModel({
        userId,
        name,
        qty,
        price,
        mode,
      });
      await newOrder.save();
      if (userId) {
        await updateHoldings(userId, name, qty, price);
      }
    }
    res.json({ success: true, message: "Order placed successfully", order: { name, qty, price, mode } });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// All Orders Endpoint
app.get("/allOrders", async (req, res) => {
  try {
    const userId = req.query.id;
    if (isDbConnected && userId) {
      let allOrders = await OrdersModel.find({ userId }).populate("userId");
      return res.json(allOrders);
    }
    return res.json([
      { name: "AAPL", qty: 10, price: 185.0, mode: "BUY", status: "Executed", createdAt: new Date() },
      { name: "NVDA", qty: 5, price: 480.0, mode: "BUY", status: "Executed", createdAt: new Date() },
    ]);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Funds / Wallet management
app.post("/updateFunds", async (req, res) => {
  try {
    const { amount, type } = req.body;
    res.json({ success: true, message: `${type} of $${amount} processed successfully` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update funds" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
