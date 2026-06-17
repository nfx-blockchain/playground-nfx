import React, { useState } from 'react';

interface DeployProps {
    bytecode: string;
    abi: any[];
}

export const Deploy: React.FC<DeployProps> = ({ bytecode, abi }) => {
    const [walletConnected, setWalletConnected] = useState(false);
    const [deploying, setDeploying] = useState(false);

    const connectWallet = async () => {
        setWalletConnected(true);
    };

    const deployContract = async () => {
        setDeploying(true);
        setTimeout(() => setDeploying(false), 2000);
    };

    return (
        <div className="deploy-panel">
            {!walletConnected ? (
                <button className="secondary-btn" onClick={connectWallet}>Connect Wallet</button>
            ) : (
                <>
                    <div className="bytecode-preview">
                        <strong>Bytecode:</strong>
                        <code>{bytecode.slice(0, 60)}...</code>
                    </div>
                    <button className="wallet-btn" onClick={deployContract} disabled={deploying}>
                        {deploying ? 'Deploying...' : 'Deploy Contract'}
                    </button>
                </>
            )}
        </div>
    );
};

export default Deploy;