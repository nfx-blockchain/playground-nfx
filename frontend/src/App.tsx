import React, { useState, useEffect } from 'react';
import { ContractEditor } from './components/Editor';
import { Deploy } from './components/Deploy';
import { CompilerOutput } from './components/Compiler';
import Login from './Login';
import { NFXProvider } from 'id-nfx';
import './App.css';

function App() {
    const [hasAccess, setHasAccess] = useState(false);
    const [compilerOutput, setCompilerOutput] = useState({
        bytecode: '',
        abi: [],
        errors: [] as string[]
    });
    const [networkInfo, setNetworkInfo] = useState({
        name: 'Unknown',
        blocks: 0,
        connections: 0
    });

    useEffect(() => {
        const access = localStorage.getItem('nfx_playground_access');
        if (access) setHasAccess(true);
    }, []);

    useEffect(() => {
        if (hasAccess) {
            const provider = new NFXProvider({ rpc: 'http://localhost:27444' });
            provider.getinfo().then(info => {
                if (info) {
                    setNetworkInfo({
                        name: info.testnet ? 'Testnet' : 'Mainnet',
                        blocks: info.blocks,
                        connections: info.connections
                    });
                }
            }).catch(() => {
                setNetworkInfo({ name: 'Offline', blocks: 0, connections: 0 });
            });
        }
    }, [hasAccess]);

    const handleLogout = () => {
        localStorage.removeItem('nfx_playground_access');
        setHasAccess(false);
    };

    if (!hasAccess) {
        return <Login />;
    }

    return (
        <div className="app">
            <header>
                <h1>NFX Contract Playground</h1>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>
            <main>
                <div className="panels">
                    <div className="panel">
                        <h2>Editor</h2>
                        <ContractEditor />
                    </div>
                    <div className="panel">
                        <h2>Compiler Output</h2>
                        <CompilerOutput output={compilerOutput} />
                    </div>
                    <div className="panel">
                        <h2>Deploy</h2>
                        <Deploy bytecode={compilerOutput.bytecode} abi={compilerOutput.abi} />
                    </div>
                </div>
            </main>
            <footer className="network-footer">
                <span className="network-badge">{networkInfo.name} • Block: {networkInfo.blocks} • Connections: {networkInfo.connections}</span>
            </footer>
        </div>
    );
}

export default App;