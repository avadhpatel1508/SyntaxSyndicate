const mongoose = require("mongoose");
const { Schema } = mongoose;

const departmentSchema = new Schema({
  name: {
    type: String,
    enum: ["Healthcare", "Agriculture", "Education", "CityServices"],
    required: true,
  },
  description: String,
});

module.exports = mongoose.model("Department", departmentSchema);