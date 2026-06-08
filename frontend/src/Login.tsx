import React, { useState } from 'react';
import { ContractEditor } from './ContractEditor';

// Simple login - connects to NFX wallet or uses demo mode
export const Login: React.FC = () => {
    const [accessing, setAccessing] = useState(false);
    const [showDemo, setShowDemo] = useState(false);

    const connectWallet = async () => {
        setAccessing(true);
        // Would connect via RPC to nfxblockchaind
        setTimeout(() => {
            setAccessing(false);
            localStorage.setItem('nfx_playground_access', 'true');
        }, 1000);
    };

    const startDemo = () => {
        localStorage.setItem('nfx_playground_access', 'demo');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1>NFX Contract Playground</h1>
                <p>Web IDE for NFX Smart Contracts</p>
                
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

                <div className="features">
                    <h3>Features:</h3>
                    <ul>
                        <li>✓ Write NFX contracts</li>
                        <li>✓ Compile to bytecode</li>
                        <li>✓ Deploy to testnet/mainnet</li>
                        <li>✓ Interact with contracts</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Login;