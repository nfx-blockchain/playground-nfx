import React from 'react';
import { useTheme } from '../ThemeContext';

interface HeaderProps {
  networkInfo?: {
    name: string;
    blocks: number;
    connections: number;
  };
  onLogout?: () => void;
  onDocsToggle?: () => void;
  showDocsLink?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ networkInfo, onLogout, onDocsToggle, showDocsLink }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <div className="logo-wrapper">
            <span className="logo-icon">⚡</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">NFX Playground</h1>
            <span className="brand-subtitle">Smart Contract IDE</span>
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
          
          {showDocsLink && (
            <button 
              className="theme-toggle" 
              onClick={onDocsToggle}
              aria-label="Documentation"
            >
              📚
            </button>
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