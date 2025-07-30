const mongoose = require("mongoose");

const qrDataSchema = new mongoose.Schema(
  {
    qrId: { type: Number, required: true, unique: true },
    manufacturer: { type: String, lowercase: true },
    ipfsHash: String,
    status: {
      type: String,
      enum: ["Available", "Assigned", "Scanned", "Verified", "Recycled"],
      default: "Available",
    },
    ragPicker: { type: String, lowercase: true },
    recycler: { type: String, lowercase: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QRData", qrDataSchema);
