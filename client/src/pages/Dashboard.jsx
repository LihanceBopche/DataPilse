import { useState, useEffect, useCallback } from 'react';
import { dashboardAPI } from '../services/api';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import RevenueLineChart from '../components/charts/RevenueLineChart';
import SalesBarChart from '../components/charts/SalesBarChart';
import CategoryPieChart from '../components/charts/CategoryPieChart';
import UserGrowthAreaChart from '../components/charts/UserGrowthAreaChart';

const REFRESH_INTERVAL = 30000; // 30 seconds

// KPI Card
const StatCard = ({ icon, iconBg, label, value, change, changeType, accentClass, delay }) => (
  <div className={`stat-card ${accentClass} animate-fade animate-delay-${delay}`}>
    <div className={`stat-icon ${iconBg}`}>{icon}</div>
    <div className="stat-body">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className={`stat-change ${changeType}`}>{change}</div>
    </div>
  </div>
);

// Chart section wrapper
const ChartCard = ({ id, title, subtitle, badge, badgeColor, children, fullWidth }) => (
  <div id={id} className={`chart-card ${fullWidth ? 'full-width' : ''}`}>
    <div className="chart-header">
      <div>
        <div className="chart-title">{title}</div>
        <div className="chart-subtitle">{subtitle}</div>
      </div>
      {badge && (
        <span className="chart-badge" style={{ background: `${badgeColor}20`, color: badgeColor }}>
          {badge}
        </span>
      )}
    </div>
    {children}
  </div>
);

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [lastUpdated, setLastUpdated]     = useState(null);

  const [stats, setStats]           = useState(null);
  const [revenueData, setRevenue]   = useState([]);
  const [salesData, setSales]       = useState([]);
  const [userStatsData, setUsers]   = useState([]);
  const [categoryData, setCategory] = useState([]);
  const [loading, setLoading]       = useState(true);

  const fetchAll = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [statsRes, revRes, salRes, usrRes, catRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRevenue(),
        dashboardAPI.getSales(),
        dashboardAPI.getUserStats(),
        dashboardAPI.getCategories(),
      ]);
      setStats(statsRes.data.data);
      setRevenue(revRes.data.data);
      setSales(salRes.data.data);
      setUsers(usrRes.data.data);
      setCategory(catRes.data.data);
      setLastUpdated(new Date());
    } catch (err) {
      toast.error('Failed to fetch dashboard data.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => { fetchAll(); }, [fetchAll]);

  // Auto-refresh every 30s
  useEffect(() => {
    const interval = setInterval(() => fetchAll(true), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchAll]);

  const fmt = (n) => n == null ? '—' : n.toLocaleString();
  const fmtUSD = (n) => n == null ? '—' : `$${(n / 1000).toFixed(1)}k`;

  const kpiCards = [
    {
      icon: '👥', iconBg: 'icon-bg-purple', accentClass: 'stat-card-purple',
      label: 'Total Users', value: fmt(stats?.totalUsers),
      change: `+${fmt(stats?.totalUsers)} registered`, changeType: 'positive', delay: 1,
    },
    {
      icon: '💰', iconBg: 'icon-bg-cyan', accentClass: 'stat-card-cyan',
      label: 'Total Revenue', value: fmtUSD(stats?.totalRevenue),
      change: `${stats?.revenueGrowth >= 0 ? '+' : ''}${stats?.revenueGrowth}% vs last month`,
      changeType: stats?.revenueGrowth >= 0 ? 'positive' : 'negative', delay: 2,
    },
    {
      icon: '🛒', iconBg: 'icon-bg-green', accentClass: 'stat-card-green',
      label: 'Units Sold', value: fmt(stats?.totalSales),
      change: 'Across all categories', changeType: 'neutral', delay: 3,
    },
    {
      icon: '⚡', iconBg: 'icon-bg-amber', accentClass: 'stat-card-amber',
      label: 'Active Users', value: fmt(stats?.activeUsers),
      change: 'This month', changeType: 'positive', delay: 4,
    },
  ];

  const showSection = (section) => activeSection === 'dashboard' || activeSection === section;

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <Navbar
          activeSection={activeSection}
          lastUpdated={lastUpdated}
          onRefresh={() => fetchAll(true)}
          onMenuToggle={() => setSidebarOpen((v) => !v)}
        />

        <main className="dashboard-page" role="main">
          {/* Page Header */}
          <div className="page-header">
            <div>
              <h1>Analytics Overview</h1>
              <p>Real-time data from your MongoDB database</p>
            </div>
          </div>

          {/* KPI Cards */}
          {(activeSection === 'dashboard') && (
            <div className="stats-grid">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="stat-card" style={{ minHeight: 100, opacity: 0.4 }} />
                  ))
                : kpiCards.map((c) => <StatCard key={c.label} {...c} />)
              }
            </div>
          )}

          {/* Charts Grid */}
          <div className={activeSection === 'dashboard' ? 'charts-grid' : ''}>

            {/* Revenue Line Chart */}
            {(activeSection === 'dashboard' || activeSection === 'revenue') && (
              <ChartCard
                id="chart-revenue"
                title="Monthly Revenue"
                subtitle="Actual vs target revenue (2024)"
                badge="Line Chart"
                badgeColor="#6366f1"
                fullWidth={activeSection === 'revenue'}
              >
                <RevenueLineChart data={revenueData} />
              </ChartCard>
            )}

            {/* Sales Bar Chart */}
            {(activeSection === 'dashboard' || activeSection === 'sales') && (
              <ChartCard
                id="chart-sales"
                title="Sales Volume"
                subtitle="Units sold per month (2024)"
                badge="Bar Chart"
                badgeColor="#8b5cf6"
                fullWidth={activeSection === 'sales'}
              >
                <SalesBarChart data={salesData} />
              </ChartCard>
            )}

            {/* Category Pie Chart */}
            {(activeSection === 'dashboard' || activeSection === 'categories') && (
              <ChartCard
                id="chart-categories"
                title="Category Breakdown"
                subtitle="Sales distribution by product type"
                badge="Donut Chart"
                badgeColor="#06b6d4"
                fullWidth={activeSection === 'categories'}
              >
                <CategoryPieChart data={categoryData} />
              </ChartCard>
            )}

            {/* User Growth Area Chart */}
            {(activeSection === 'dashboard' || activeSection === 'users') && (
              <ChartCard
                id="chart-users"
                title="User Growth"
                subtitle="Total, active and new users per month"
                badge="Area Chart"
                badgeColor="#10b981"
                fullWidth={activeSection === 'users'}
              >
                <UserGrowthAreaChart data={userStatsData} />
              </ChartCard>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
