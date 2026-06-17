# Usage Guide

## Getting Started

### Quick Start (Offline)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

### Authentication

Click **Open Editor (Offline Mode)** for immediate access to write and compile contracts without connecting a wallet.

Or click **Connect Wallet** to connect your NFX wallet for deployment features.

## Writing Contracts

The editor supports NFX contract language with syntax highlighting.

### Basic Template

```
pragma nfx ^1.0.0;

contract ContractName {
    // State variables
    string public name;
    
    // Constructor
    constructor() {
        name = "Default";
    }
    
    // Functions
    function setValue(string _value) public {
        name = _value;
    }
}
```

## Features

### Editor
- Monaco Editor with NFX syntax highlighting
- Auto-completion for NFX keywords
- Line numbers and code folding

### Compiler
- Compile `.nfx` contracts to bytecode
- Works offline without blockchain connection
- Error highlighting for syntax issues

### Deploy (Requires Wallet)
- Deploy compiled contracts to NFX blockchain
- Testnet/Mainnet network selection
- Transaction status monitoring

### Theme
- Toggle between dark/light mode
- Preference saved to localStorage
- System preference detection on first visit