const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getStats,
  getRevenue,
  getSales,
  getUserStats,
  getCategories,
} = require('../controllers/dashboardController');

// All dashboard routes are protected
router.use(protect);

router.get('/stats', getStats);
router.get('/revenue', getRevenue);
router.get('/sales', getSales);
router.get('/userstats', getUserStats);
router.get('/categories', getCategories);

module.exports = router;
