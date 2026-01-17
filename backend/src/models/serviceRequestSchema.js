const mongoose = require("mongoose");
const { Schema } = mongoose;

const serviceRequestSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    type: String, // appointment, complaint, subsidy, etc.
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    pincode: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);