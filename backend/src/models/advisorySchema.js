const advisorySchema = new Schema(
  {
    service: {
      type: String,
      enum: ["Agriculture", "Healthcare", "Education", "Urban"],
      required: true,
    },

    title: String,

    message: String,

    validTill: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Advisory", advisorySchema);
