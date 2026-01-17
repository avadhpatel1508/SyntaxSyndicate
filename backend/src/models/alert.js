const mongoose = require("mongoose");
const { Schema } = mongoose;

const alertSchema = new Schema(
  {
    department: String,
    alertType: String,
    severity: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
    },
    pincode: String,
    description: String,
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Alert", alertSchema);