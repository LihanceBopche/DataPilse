const Revenue = require('../models/Revenue');
const Sales = require('../models/Sales');
const UserStats = require('../models/UserStats');
const Category = require('../models/Category');
const User = require('../models/User');

// @route   GET /api/dashboard/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    const [totalUsers, revenueData, salesData, userStatsData] = await Promise.all([
      User.countDocuments(),
      Revenue.find().sort({ year: 1 }).lean(),
      Sales.find().lean(),
      UserStats.find().sort({ year: 1 }).lean(),
    ]);

    // Total revenue (sum of all months)
    const totalRevenue = revenueData.reduce((sum, r) => sum + r.amount, 0);

    // Total units sold
    const totalSales = salesData.reduce((sum, s) => sum + s.units, 0);

    // Latest month active users
    const latestStats = userStatsData[userStatsData.length - 1];
    const activeUsers = latestStats ? latestStats.activeUsers : 0;

    // Month-over-month revenue growth
    let revenueGrowth = 0;
    if (revenueData.length >= 2) {
      const last = revenueData[revenueData.length - 1].amount;
      const prev = revenueData[revenueData.length - 2].amount;
      revenueGrowth = prev > 0 ? (((last - prev) / prev) * 100).toFixed(1) : 0;
    }

    return res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalRevenue,
        totalSales,
        activeUsers,
        revenueGrowth: parseFloat(revenueGrowth),
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/dashboard/revenue
// @access  Private
const getRevenue = async (req, res) => {
  try {
    const data = await Revenue.find().sort({ year: 1, _id: 1 }).lean();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/dashboard/sales
// @access  Private
const getSales = async (req, res) => {
  try {
    const data = await Sales.find().sort({ year: 1, _id: 1 }).lean();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/dashboard/userstats
// @access  Private
const getUserStats = async (req, res) => {
  try {
    const data = await UserStats.find().sort({ year: 1, _id: 1 }).lean();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @route   GET /api/dashboard/categories
// @access  Private
const getCategories = async (req, res) => {
  try {
    const data = await Category.find().lean();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { getStats, getRevenue, getSales, getUserStats, getCategories };
