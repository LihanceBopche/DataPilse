const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    year:  { type: Number, required: true },
    units: { type: Number, required: true },        // units sold
    returns: { type: Number, default: 0 },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Sales', salesSchema);
