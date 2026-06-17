import React, { useState } from 'react';
import { NFXProvider } from 'id-nfx';

export const Login: React.FC = () => {
    const [accessing, setAccessing] = useState(false);

    const connectWallet = async () => {
        setAccessing(true);
        try {
            const provider = new NFXProvider({ rpc: 'http://localhost:27444' });
            await provider.requestAccounts();
            localStorage.setItem('nfx_playground_access', 'wallet');
        } catch (e) {
            localStorage.setItem('nfx_playground_access', 'demo');
        }
        setAccessing(false);
    };

    const startDemo = () => {
        localStorage.setItem('nfx_playground_access', 'demo');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo">⚡</div>
                <h1>NFX Contract Playground</h1>
                <p className="subtitle">Web IDE for NFX Smart Contracts</p>
                
                <p className="description">
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
                        className="demo-btn" 
                        onClick={startDemo}
                    >
                        Demo Mode (Offline)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;