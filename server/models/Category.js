const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },         // e.g. "Electronics"
    value: { type: Number, required: true },        // percentage or count
    color: { type: String, default: '#8884d8' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
