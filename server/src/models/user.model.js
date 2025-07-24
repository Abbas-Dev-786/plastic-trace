const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    walletAddress: {
      type: String,
      required: true,
      //   lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MANUFACTURER", "RECYCLER", "RAGPICKER", "CITIZEN"],
      required: true,
    },
    scans: { type: Number, default: 0 },
    rewards: { type: String, default: "0" }, // stored as string (wei)
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
