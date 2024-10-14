const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");

const { Schema } = mongoose; 

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"your email is required"],
        unique:true,
    },
    username:{
        type:String,
        required:[true,"your username is required"],

    },
    password:{
        type: String,
    required: [true, "Your password is required"],
    },
    holdings: [
        {
            type: Schema.Types.ObjectId,
            ref: "holding", // Referencing Holdings collection by ObjectId
        },
    ],
      orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "order", // Referencing Holdings collection by ObjectId
        },
    ],
    positions: [
        {
            type: Schema.Types.ObjectId,
            ref: "position", // Referencing Holdings collection by ObjectId
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
      },

});
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
  });
  
  module.exports = mongoose.model("User", userSchema);