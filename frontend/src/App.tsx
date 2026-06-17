import React, { useState, useEffect, useCallback } from 'react';
import { ContractEditor } from './components/Editor';
import { Deploy } from './components/Deploy';
import { CompilerOutput } from './components/Compiler';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Docs } from './components/Docs';
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
    const [activeTab, setActiveTab] = useState<'editor' | 'compiler' | 'deploy'>('editor');
    const [showDocs, setShowDocs] = useState(false);

    const checkAccess = useCallback(() => {
        const access = localStorage.getItem('nfx_playground_access');
        setHasAccess(!!access);
    }, []);

    useEffect(() => {
        checkAccess();
        
        // Listen for storage changes (useful for multi-tab sync)
        const handleStorageChange = () => checkAccess();
        window.addEventListener('storage', handleStorageChange);
        
        // Listen for custom login event
        const handleLoginEvent = () => checkAccess();
        window.addEventListener('nfx-login', handleLoginEvent);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('nfx-login', handleLoginEvent);
        };
    }, [checkAccess]);

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

    if (showDocs) {
        return <Docs onBack={() => setShowDocs(false)} />;
    }

    return (
        <div className="app">
            {hasAccess ? (
                <>
                    <Header 
                        networkInfo={networkInfo} 
                        onLogout={handleLogout} 
                        onDocsToggle={() => setShowDocs(true)}
                        showDocsLink={true}
                    />
                    <main className="main">
                        <div className="mobile-tabs">
                            <button 
                                className={`mobile-tab ${activeTab === 'editor' ? 'active' : ''}`}
                                onClick={() => setActiveTab('editor')}
                            >
                                Editor
                            </button>
                            <button 
                                className={`mobile-tab ${activeTab === 'compiler' ? 'active' : ''}`}
                                onClick={() => setActiveTab('compiler')}
                            >
                                Compiler
                            </button>
                            <button 
                                className={`mobile-tab ${activeTab === 'deploy' ? 'active' : ''}`}
                                onClick={() => setActiveTab('deploy')}
                            >
                                Deploy
                            </button>
                        </div>
                        <div className="panels">
                            <div className={`panel ${activeTab !== 'editor' ? 'mobile-hidden' : ''} editor-panel`}>
                                <div className="panel-header">
                                    <h2>Contract Editor</h2>
                                    <span className="panel-icon">📝</span>
                                </div>
                                <div className="editor-container">
                                    <ContractEditor />
                                </div>
                            </div>
                            <div className={`panel ${activeTab !== 'compiler' ? 'mobile-hidden' : ''} other-panel`}>
                                <div className="panel-header">
                                    <h2>Compiler Output</h2>
                                    <span className="panel-icon">⚙️</span>
                                </div>
                                <CompilerOutput output={compilerOutput} />
                            </div>
                            <div className={`panel ${activeTab !== 'deploy' ? 'mobile-hidden' : ''} other-panel`}>
                                <div className="panel-header">
                                    <h2>Deploy Contract</h2>
                                    <span className="panel-icon">🚀</span>
                                </div>
                                <Deploy bytecode={compilerOutput.bytecode} abi={compilerOutput.abi} />
                            </div>
                        </div>
                    </main>
                    <Footer />
                </>
            ) : (
                <Login onSuccess={checkAccess} />
            )}
        </div>
    );
}

export default App;