const mongoose = require("mongoose");
const { Schema } = mongoose;

const prescriptionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorName: String,

    date: Date,

    medicines: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
