const { HoldingsModel } = require("./models/HoldingsModel");

// Function to update holdings
const updateHoldings = async (userId,stockName, qty, price) => {
    // Find the holding for the stock
    let holding = await HoldingsModel.findOne({userId, name:stockName });

    if (holding) {
        // Update existing holding
        holding.qty = holding.qty + qty; // Adding the qty to the existing qty
        // Update quantity
        holding.avg = ((holding.avg * (holding.qty - qty)) + (price * qty)) / holding.qty; // Update average price
        holding.net = (holding.qty * holding.avg).toFixed(2); // Update net value
        holding.day = new Date().toLocaleDateString(); // Update the date of last action
        await holding.save();
    } else {
        // Create new holding if it doesn't exist
        let newHolding = new HoldingsModel({
            userId,
            name:stockName,
            qty,
            avg: price,
            price,
            net: (qty * price).toFixed(2),
            day: new Date().toLocaleDateString(),
        });
        await newHolding.save();
    }
};

module.exports = { updateHoldings };
