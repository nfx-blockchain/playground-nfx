# NFX Contract Playground

Web-based IDE for compiling and deploying NFX smart contracts on the blockchain.

## Live Demo

🚀 **Launch Playground:** http://localhost:5173 (after running dev server)

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Features

| Feature | Description | Status |
|---------|-------------|--------|
| 📝 Editor | Monaco Editor with NFX syntax highlighting | ✅ Available |
| ⚙️ Compiler | NFX → Bytecode compilation (works offline) | ✅ Available |
| 🚀 Deploy | Connect wallet and deploy to blockchain | 🔗 Requires connection |
| 🔍 Interact | Call contract functions and query state | 🔗 Requires connection |

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Editor:** Monaco Editor (@monaco-editor/react)
- **Theming:** CSS Variables with dark/light mode
- **Network:** NFX RPC via `id-nfx` provider

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Navigation header
│   │   ├── Footer.tsx        # Footer component
│   │   ├── Editor.tsx        # Code editor
│   │   ├── Compiler.tsx      # Compile output display
│   │   └── Deploy.tsx        # Deploy form
│   ├── ThemeContext.tsx      # Dark/Light theme provider
│   ├── App.tsx             # Main application
│   └── index.css           # Global styles
├── package.json
└── tsconfig.json
```

## Theme

The playground includes a professional dark/light theme toggle:
- **Dark mode** (default): Modern dark interface optimized for coding
- **Light mode**: Clean, minimalist interface for daylight use

Theme preference is saved to localStorage and respects system preference.

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Connect Wallet** to deploy contracts on the blockchain
2. **Or use Offline Mode** to write and compile contracts without a wallet
3. **Write** your NFX smart contract in the editor
4. **Compile** to generate bytecode
5. **Deploy** to testnet or mainnet with connected wallet (requires wallet)
6. **Interact** with deployed contracts (requires connection)

## Network Connection

The application connects to NFX RPC endpoints:
- Default: `http://localhost:27444`
- Configurable via `NFXProvider` initialization

## License

MIT License - NFX Labs