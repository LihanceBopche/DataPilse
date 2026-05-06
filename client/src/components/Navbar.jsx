import { useState } from 'react';

const sectionTitles = {
  dashboard:  { title: 'Dashboard Overview', subtitle: 'All your key metrics at a glance' },
  revenue:    { title: 'Revenue Analytics',  subtitle: 'Track monthly revenue trends' },
  sales:      { title: 'Sales Performance',  subtitle: 'Units sold and returns analysis' },
  users:      { title: 'User Growth',        subtitle: 'Monitor user acquisition and activity' },
  categories: { title: 'Category Breakdown', subtitle: 'Sales distribution by product category' },
};

const Navbar = ({ activeSection, lastUpdated, onRefresh, onMenuToggle }) => {
  const [spinning, setSpinning] = useState(false);

  const info = sectionTitles[activeSection] || sectionTitles.dashboard;

  const handleRefresh = () => {
    setSpinning(true);
    onRefresh();
    setTimeout(() => setSpinning(false), 900);
  };

  const formatted = lastUpdated
    ? new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(lastUpdated)
    : '—';

  return (
    <header className="navbar" role="banner">
      <div className="navbar-left">
        {/* Mobile hamburger */}
        <button
          id="navbar-hamburger"
          className="hamburger"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div>
          <div className="navbar-title">{info.title}</div>
          <div className="navbar-subtitle">{info.subtitle}</div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="last-updated">🕐 {formatted}</div>

        <div className="navbar-badge">
          <span className="navbar-dot" />
          Live
        </div>

        <button
          id="navbar-refresh"
          className={`refresh-btn ${spinning ? 'spinning' : ''}`}
          onClick={handleRefresh}
          title="Refresh data"
          aria-label="Refresh dashboard data"
        >
          🔄
        </button>
      </div>
    </header>
  );
};

export default Navbar;
