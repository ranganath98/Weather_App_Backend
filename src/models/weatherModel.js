const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    lowercase: true,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  units: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
  },
  coord: {
    lat: { type: String },
    lon: { type: String },
  },
});

module.exports = mongoose.model("weather", weatherSchema, "weather");
