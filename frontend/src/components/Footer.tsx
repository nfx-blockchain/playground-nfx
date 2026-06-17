import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="footer-logo">⚡ NFX Playground</span>
          <span className="footer-copyright">
            © {new Date().getFullYear()} NFX Labs. All rights reserved.
          </span>
        </div>
        
        <div className="footer-links">
          <a href="https://docs.nfxblockchain.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            Documentation
          </a>
          <a href="https://github.com/nfx-blockchain" target="_blank" rel="noopener noreferrer" className="footer-link">
            GitHub
          </a>
          <a href="https://discord.gg/kz5Ke4ZTxf" target="_blank" rel="noopener noreferrer" className="footer-link">
            Discord
          </a>
        </div>
      </div>
    </footer>
  );
};