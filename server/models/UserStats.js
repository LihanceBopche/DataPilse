const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    year:  { type: Number, required: true },
    newUsers: { type: Number, required: true },
    totalUsers: { type: Number, required: true },
    activeUsers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserStats', userStatsSchema);
