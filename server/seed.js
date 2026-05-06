/**
 * Seed script — populates MongoDB with 12 months of realistic demo data.
 * Run: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Revenue = require('./models/Revenue');
const Sales = require('./models/Sales');
const UserStats = require('./models/UserStats');
const Category = require('./models/Category');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const revenueData = [
  { month: 'Jan', year: 2024, amount: 42000, target: 40000 },
  { month: 'Feb', year: 2024, amount: 47500, target: 45000 },
  { month: 'Mar', year: 2024, amount: 53200, target: 50000 },
  { month: 'Apr', year: 2024, amount: 49800, target: 52000 },
  { month: 'May', year: 2024, amount: 61000, target: 58000 },
  { month: 'Jun', year: 2024, amount: 67300, target: 65000 },
  { month: 'Jul', year: 2024, amount: 72000, target: 70000 },
  { month: 'Aug', year: 2024, amount: 68400, target: 72000 },
  { month: 'Sep', year: 2024, amount: 79500, target: 75000 },
  { month: 'Oct', year: 2024, amount: 83200, target: 80000 },
  { month: 'Nov', year: 2024, amount: 91000, target: 88000 },
  { month: 'Dec', year: 2024, amount: 105000, target: 100000 },
];

const salesData = [
  { month: 'Jan', year: 2024, units: 320, returns: 12, category: 'Electronics' },
  { month: 'Feb', year: 2024, units: 380, returns: 15, category: 'Electronics' },
  { month: 'Mar', year: 2024, units: 410, returns: 18, category: 'Clothing' },
  { month: 'Apr', year: 2024, units: 390, returns: 20, category: 'Electronics' },
  { month: 'May', year: 2024, units: 480, returns: 22, category: 'Furniture' },
  { month: 'Jun', year: 2024, units: 520, returns: 19, category: 'Electronics' },
  { month: 'Jul', year: 2024, units: 560, returns: 25, category: 'Clothing' },
  { month: 'Aug', year: 2024, units: 530, returns: 28, category: 'Electronics' },
  { month: 'Sep', year: 2024, units: 610, returns: 21, category: 'Furniture' },
  { month: 'Oct', year: 2024, units: 650, returns: 30, category: 'Electronics' },
  { month: 'Nov', year: 2024, units: 720, returns: 35, category: 'Clothing' },
  { month: 'Dec', year: 2024, units: 840, returns: 40, category: 'Electronics' },
];

const userStatsData = [
  { month: 'Jan', year: 2024, newUsers: 120, totalUsers: 1200, activeUsers: 980 },
  { month: 'Feb', year: 2024, newUsers: 145, totalUsers: 1345, activeUsers: 1100 },
  { month: 'Mar', year: 2024, newUsers: 160, totalUsers: 1505, activeUsers: 1220 },
  { month: 'Apr', year: 2024, newUsers: 138, totalUsers: 1643, activeUsers: 1340 },
  { month: 'May', year: 2024, newUsers: 185, totalUsers: 1828, activeUsers: 1500 },
  { month: 'Jun', year: 2024, newUsers: 210, totalUsers: 2038, activeUsers: 1680 },
  { month: 'Jul', year: 2024, newUsers: 195, totalUsers: 2233, activeUsers: 1830 },
  { month: 'Aug', year: 2024, newUsers: 220, totalUsers: 2453, activeUsers: 2010 },
  { month: 'Sep', year: 2024, newUsers: 240, totalUsers: 2693, activeUsers: 2200 },
  { month: 'Oct', year: 2024, newUsers: 260, totalUsers: 2953, activeUsers: 2420 },
  { month: 'Nov', year: 2024, newUsers: 290, totalUsers: 3243, activeUsers: 2660 },
  { month: 'Dec', year: 2024, newUsers: 350, totalUsers: 3593, activeUsers: 2950 },
];

const categoryData = [
  { name: 'Electronics', value: 38, color: '#6366f1' },
  { name: 'Clothing',    value: 24, color: '#8b5cf6' },
  { name: 'Furniture',   value: 18, color: '#a78bfa' },
  { name: 'Books',       value: 12, color: '#c4b5fd' },
  { name: 'Others',      value: 8,  color: '#ddd6fe' },
];

const seed = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    await Promise.all([
      Revenue.deleteMany({}),
      Sales.deleteMany({}),
      UserStats.deleteMany({}),
      Category.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing chart data.');

    // Insert new data
    await Revenue.insertMany(revenueData);
    console.log(`✅ Inserted ${revenueData.length} revenue records.`);

    await Sales.insertMany(salesData);
    console.log(`✅ Inserted ${salesData.length} sales records.`);

    await UserStats.insertMany(userStatsData);
    console.log(`✅ Inserted ${userStatsData.length} user stats records.`);

    await Category.insertMany(categoryData);
    console.log(`✅ Inserted ${categoryData.length} category records.`);

    console.log('\n🎉 Database seeded successfully!');
    console.log('👉 Now run: node server.js\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seed();
