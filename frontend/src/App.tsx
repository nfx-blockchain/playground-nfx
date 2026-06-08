import React, { useState, useEffect } from 'react';
import { ContractEditor } from './components/Editor';
import { Deploy } from './components/Deploy';
import { CompilerOutput } from './components/Compiler';
import Login from './Login';
import './App.css';

function App() {
    const [hasAccess, setHasAccess] = useState(false);
    const [compilerOutput, setCompilerOutput] = useState({
        bytecode: '',
        abi: [],
        errors: [] as string[]
    });

    useEffect(() => {
        const access = localStorage.getItem('nfx_playground_access');
        if (access) setHasAccess(true);
    }, []);

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
        </div>
    );
}

export default App;