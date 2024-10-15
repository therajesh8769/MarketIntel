const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const app=express();
const  Cookies=require("js-cookie");

app.use(bodyParser.json());
require('dotenv').config();
const mongoose=require('mongoose');
const {HoldingsModel}=require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");
const { updateHoldings } = require("./holdingsController");
const authRoute = require("./Routes/AuthRoute");
const { userVerification } = require("./Middlewares/AuthMIddelware");


const PORT=process.env.PORT || 8080;
const uri=process.env.MONGO_URL;
//mongodb://127.0.0.1:27017/zerodha

main()
.then((res)=>
{
    console.log("connection success");

})
.catch((err)=>console.log(err));
async function main()
{
    await mongoose.connect(uri);

};

app.listen(PORT,()=>
    {
        console.log("server is running on 8080");
    });
    


app.use(
    cors({
      origin: ["http://localhost:3001","http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

  app.use(cookieParser());
  app.use(express.json());
//   const user = JSON.parse(Cookies.get('user'));
//  console.log(user);

  app.use("/", authRoute);
app.get("/allHoldings",async(req,res)=>
 { console.log("request received at holdings");

 const userId=req.query.id;
 console.log("User ID:", userId);
 console.log(userId);
  let allHoldings = await HoldingsModel.find({userId}).populate("userId");
  res.json(allHoldings);
 


});
app.get("/allPositions",async(req,res)=>
    {
        let allPositions=await PositionsModel.find();
        res.json(allPositions);
        console.log("request received at positions");
    
    });
    
    
app.post("/newOrder", async(req,res)=>
{ console.log("req at new order");
    const userId = req.body.userId;
   let newOrder=new OrdersModel({
    userId,
    name: req.body.name,
    qty:req.body.qty,
    price:req.body.price,
    
    mode:req.body.mode,
    
   });
   
   let res1=await newOrder.save();
   console.log("req after save", res1);
   
   res.send("order saved");
   console.log("req at orders");

   // Update holdings after placing the order
    await updateHoldings(userId,req.body.name, req.body.qty, req.body.price); // Call the update function

   //res.send("Order saved and holdings updated");
   console.log("Request received at orders");



});
app.get("/allOrders",async(req,res)=>
    {

const userId=req.query.id;
console.log(userId);
  let allOrders=await OrdersModel.find({userId}).populate("userId");
        res.json(allOrders);
        console.log("request received at orders");
    
    });

