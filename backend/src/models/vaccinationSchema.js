const mongoose = require("mongoose");
const { Schema } = mongoose;

const vaccinationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: String,
    date: Date,

    status: {
      type: String,
      enum: ["Completed", "Pending"],
      default: "Completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vaccination", vaccinationSchema);
