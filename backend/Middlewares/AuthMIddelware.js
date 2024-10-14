const User = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");


module.exports.userVerification = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false })
    } else {
      const user = await User.findById(data.id)
      if (user) {
        eq.user = user; // Attach user info to request object
        next();
        //return res.json({ status: true, user: user.username })
      }
      else {
        return res.json({ status: false })
      }
    }
  })
};
