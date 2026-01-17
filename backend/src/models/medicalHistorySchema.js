const mongoose = require("mongoose");
const { Schema } = mongoose;

const medicalHistorySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: String,
    description: String,
    date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalHistory", medicalHistorySchema);
