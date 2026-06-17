import React, { useState, useEffect } from 'react';
import { ContractEditor } from './components/Editor';
import { Deploy } from './components/Deploy';
import { CompilerOutput } from './components/Compiler';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
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

    return (
        <div className="app">
            {hasAccess ? (
                <>
                    <Header networkInfo={networkInfo} onLogout={handleLogout} />
                    <main className="main">
                        <div className="panels">
                            <div className="panel">
                                <div className="panel-header">
                                    <h2>Editor</h2>
                                    <span className="panel-icon">📝</span>
                                </div>
                                <div className="editor-container">
                                    <ContractEditor />
                                </div>
                            </div>
                            <div className="panel">
                                <div className="panel-header">
                                    <h2>Compiler Output</h2>
                                    <span className="panel-icon">⚙️</span>
                                </div>
                                <CompilerOutput output={compilerOutput} />
                            </div>
                            <div className="panel">
                                <div className="panel-header">
                                    <h2>Deploy</h2>
                                    <span className="panel-icon">🚀</span>
                                </div>
                                <Deploy bytecode={compilerOutput.bytecode} abi={compilerOutput.abi} />
                            </div>
                        </div>
                    </main>
                    <Footer />
                </>
            ) : (
                <Login />
            )}
        </div>
    );
}

export default App;