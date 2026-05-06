import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: '📊', label: 'Dashboard',  id: 'dashboard' },
  { icon: '💰', label: 'Revenue',    id: 'revenue' },
  { icon: '🛒', label: 'Sales',      id: 'sales' },
  { icon: '👥', label: 'Users',      id: 'users' },
  { icon: '📁', label: 'Categories', id: 'categories' },
];

const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`sidebar ${isOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">📊</div>
          <span className="sidebar-logo-text">DataPulse</span>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <p className="nav-section-label">Main Menu</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => { onSectionChange(item.id); onClose(); }}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              <span className="nav-item-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.name || 'User'}</div>
              <div className="sidebar-user-role">{user?.role || 'Member'}</div>
            </div>
          </div>
          <button id="sidebar-logout" className="logout-btn" onClick={logout}>
            🚪 Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
