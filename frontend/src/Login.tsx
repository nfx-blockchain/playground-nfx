import React, { useState } from 'react';
import { NFXProvider } from 'id-nfx';
import { useTheme } from './ThemeContext';

interface LoginProps {
  onSuccess?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSuccess }) => {
    const [accessing, setAccessing] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const connectWallet = async () => {
        setAccessing(true);
        try {
            const provider = new NFXProvider({ rpc: 'http://localhost:27444' });
            await provider.requestAccounts();
            localStorage.setItem('nfx_playground_access', 'wallet');
        } catch (e) {
            // If wallet connection fails, still grant offline access
            localStorage.setItem('nfx_playground_access', 'offline');
        }
        window.dispatchEvent(new CustomEvent('nfx-login'));
        onSuccess?.();
        setAccessing(false);
    };

    const enterOfflineMode = () => {
        localStorage.setItem('nfx_playground_access', 'offline');
        window.dispatchEvent(new CustomEvent('nfx-login'));
        onSuccess?.();
    };

    return (
        <div className="login-container">
            <button 
                className="theme-toggle theme-toggle-floating" 
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
                {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">⚡</div>
                    <h1>NFX Contract Playground</h1>
                    <p className="subtitle">Web IDE for NFX Smart Contracts</p>
                </div>
                
                <p className="login-description">
                    Write, compile, and deploy smart contracts on the NFX blockchain.
                    Fully compatible with NFX addresses (starts with 'B').
                </p>

                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Code Editor</h3>
                        <p>Syntax highlighting for NFX contract language</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">⚙️</div>
                        <h3>Compiler</h3>
                        <p>Compile to bytecode ready for deployment</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Deploy</h3>
                        <p>Deploy to testnet or mainnet in one click</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔍</div>
                        <h3>Interact</h3>
                        <p>Call contract functions and query state</p>
                    </div>
                </div>

                <div className="login-options">
                    <button 
                        className="wallet-btn" 
                        onClick={connectWallet}
                        disabled={accessing}
                    >
                        {accessing ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                    
                    <button 
                        className="secondary-btn" 
                        onClick={enterOfflineMode}
                    >
                        Open Editor (Offline Mode)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;