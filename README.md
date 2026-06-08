# NFX Contract Playground

Web-based IDE para compilar e deployar contratos NFX na blockchain.

## Início Rápido (Offline)

```bash
cd playground/frontend
npm install
npm run dev
```

Acesso: http://localhost:3000

## Funcionalidades

- **Editor:** Syntax highlighting NFX (Monaco Editor)
- **Compiler:** Compile .nfx → bytecode (funciona offline)
- **Deploy:** Conecta wallet → deploy na blockchain (requer conexão)

## Estrutura

```
playground/
├── frontend/          # React UI
│   ├── src/
│   │   ├── components/
│   │   │   ├── Editor.tsx      # Monaco editor
│   │   │   ├── Deploy.tsx      # Deploy form
│   │   │   └── Compiler.tsx    # Compile output
│   └── package.json
├── compiler/          # NFX → Bytecode
│   └── nfx-compiler.js
├── examples/          # Contratos de exemplo
└── README.md
```

## Tech Stack

- **Frontend:** React + TypeScript + Monaco Editor
- **Compiler:** Node.js (parser NFX)
- **Network:** Conecta via RPC ao nó NFX

## Uso

```bash
cd playground/frontend
npm install
npm run dev
```



## Deploy

1. Conecte wallet
2. Compilar contrato (.nfx)
3. Deploy na blockchain
4. Interagir via UI