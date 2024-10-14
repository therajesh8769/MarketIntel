const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructure Schema from mongoose
const { User } = require("../models/UserModel");

const OrdersSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  name: String,
  qty: Number,
  price: Number,
  mode: String,
});

module.exports ={ OrdersSchema}; // Export the model directly
