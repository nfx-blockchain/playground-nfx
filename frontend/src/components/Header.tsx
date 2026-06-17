import React from 'react';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  networkInfo?: {
    name: string;
    blocks: number;
    connections: number;
  };
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ networkInfo, onLogout }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="logo-wrapper">
            <span className="logo-icon">⚡</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">NFX LAB</h1>
            <span className="brand-subtitle">Powered by NFX Team</span>
          </div>
        </div>

        <div className="header-actions">
          {networkInfo && (
            <div className="network-info">
              <span className="network-badge">
                <span className="status-dot"></span>
                {networkInfo.name}
              </span>
              <span className="network-stats">
                Block: {networkInfo.blocks} • Conn: {networkInfo.connections}
              </span>
            </div>
          )}
          
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          
          {onLogout && (
            <button className="logout-btn" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};