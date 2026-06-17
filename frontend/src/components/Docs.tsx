import React from 'react';
import { useTheme } from '../ThemeContext';

interface DocsProps {
  onBack?: () => void;
}

export const Docs: React.FC<DocsProps> = ({ onBack }) => {
  const { theme, toggleTheme } = useTheme();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const contractTemplate = `pragma nfx ^1.0.0;

contract ContractName {
    // Your code here
}`;

  const simpleStorage = `pragma nfx ^1.0.0;

contract SimpleStorage {
    uint256 public value;
    
    function setValue(uint256 _value) public {
        value = _value;
    }
    
    function getValue() public view returns (uint256) {
        return value;
    }
}`;

  const tokenContract = `pragma nfx ^1.0.0;

contract SimpleToken {
    string public name;
    string public symbol;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    
    constructor() {
        name = "My Token";
        symbol = "MTK";
        totalSupply = 1000000;
        balanceOf[msg.sender] = totalSupply;
    }
}`;

  return (
    <div className="docs-page">
      <div className="docs-container">
        <header className="docs-header">
          <div className="docs-header-top">
            {onBack && (
              <button className="back-btn" onClick={onBack}>
                ← Back
              </button>
            )}
            <button 
              className="theme-toggle theme-toggle-docs" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
          <h1>📚 NFXLabs Documentation</h1>
          <p>Complete guide for writing, compiling and deploying smart contracts</p>
        </header>

        <div className="docs-content">
          <section className="docs-section">
            <h2>Quick Start</h2>
            <div className="docs-card">
              <h3>Accessing the Editor</h3>
              <p>Click <strong>Open Editor (Offline Mode)</strong> to start coding immediately without connecting a wallet. Use this mode to write and compile contracts.</p>
              <p>For deployment features, use <strong>Connect Wallet</strong> to connect your NFX wallet.</p>
            </div>
          </section>

          <section className="docs-section">
            <h2>Contract Structure</h2>
            <div className="docs-card">
              <p>Every NFX contract starts with a pragma and contains a contract definition:</p>
              <pre className="docs-code-block" onClick={() => copyToClipboard(contractTemplate)}>
                <span className="docs-comment">pragma nfx ^1.0.0;</span>
                {contractTemplate.substring(contractTemplate.indexOf('\n'))}
              </pre>
            </div>
          </section>

          <section className="docs-section">
            <h2>Examples</h2>
            
            <div className="docs-card">
              <h3>Simple Storage</h3>
              <pre className="docs-code-block" onClick={() => copyToClipboard(simpleStorage)}>
                {simpleStorage}
              </pre>
            </div>

            <div className="docs-card">
              <h3>Token Contract</h3>
              <pre className="docs-code-block" onClick={() => copyToClipboard(tokenContract)}>
                {tokenContract}
              </pre>
            </div>
          </section>

          <section className="docs-section">
            <h2>Data Types</h2>
            <div className="docs-grid">
              <div className="docs-type-card">
                <code className="docs-type">uint64</code>
                <span>Unsigned 64-bit integer</span>
              </div>
              <div className="docs-type-card">
                <code className="docs-type">uint256</code>
                <span>Unsigned 256-bit integer</span>
              </div>
              <div className="docs-type-card">
                <code className="docs-type">string</code>
                <span>Text strings</span>
              </div>
              <div className="docs-type-card">
                <code className="docs-type">bool</code>
                <span>Boolean (true/false)</span>
              </div>
              <div className="docs-type-card">
                <code className="docs-type">address</code>
                <span>NFX address (starts with 'B')</span>
              </div>
            </div>
          </section>

          <section className="docs-section">
            <h2>Keywords</h2>
            <div className="docs-keywords">
              <code>contract</code> <code>function</code> <code>constructor</code> <code>public</code> <code>private</code> <code>external</code> <code>returns</code> <code>require</code> <code>mapping</code> <code>view</code> <code>paid</code> <code>emit</code>
            </div>
          </section>

          <section className="docs-section">
            <h2>Best Practices</h2>
            <div className="docs-card">
              <ul>
                <li>Always specify SPDX license identifier at the top</li>
                <li>Use meaningful variable and function names</li>
                <li>Implement proper error handling with require()</li>
                <li>Test contracts thoroughly in offline mode before deployment</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Docs;