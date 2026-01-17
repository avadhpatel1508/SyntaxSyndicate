const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
      trim: true,
    },

    lastName: {
      type: String,
      maxlength: 20,
      trim: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      immutable: true,
    },

    mobileNo: {
      type: String,
      unique: true,
      sparse: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["citizen", "departmentAdmin", "governmentAdmin", "systemAdmin"],
      default: "citizen",
    },
    keyid:{
      type:Number,
      min:10,
      max:10
    },
    // 🔥 Tracks which services the user has availed
    servicesUsed: {
      type: [String],
      enum: ["Agriculture", "Healthcare", "Education", "Urban"],
      default: [],
    },

    address: {
      line1: String,
      city: String,
      state: String,
      pincode: {
        type: String,
        min:6,
        max:6,
        index: true,
      },
    },

    verification: {
      emailVerified: { type: Boolean, default: false },
      phoneVerified: { type: Boolean, default: false },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
