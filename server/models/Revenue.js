const mongoose = require('mongoose');

const revenueSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },       // e.g. "Jan", "Feb"
    year:  { type: Number, required: true },
    amount: { type: Number, required: true },       // in USD
    target: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Revenue', revenueSchema);
