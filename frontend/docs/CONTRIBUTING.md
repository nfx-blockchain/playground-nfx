# Contributing

## Development Setup

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx       # Top navigation
│   ├── Footer.tsx       # Bottom footer
│   ├── Editor.tsx       # Monaco code editor
│   ├── Compiler.tsx     # Compile output
│   ├── Deploy.tsx       # Deploy form
│   └── ui.tsx           # Reusable UI components
├── ThemeContext.tsx     # Dark/light theme provider
├── ToastContext.tsx     # Notification system
├── Login.tsx          # Login screen
├── App.tsx            # Main application
└── index.css          # Global styles
```

## Components

### Header Props
```tsx
interface HeaderProps {
  networkInfo?: {
    name: string;
    blocks: number;
    connections: number;
  };
  onLogout?: () => void;
}
```

### Theme Context
```tsx
const { theme, toggleTheme } = useTheme();
// theme: 'dark' | 'light'
```

### Toast Notifications
```tsx
const { showToast } = useToast();
showToast('Message', 'success' | 'error' | 'warning' | 'info');
```

## Code Style

- TypeScript strict mode
- CSS variables for theming
- Mobile-first responsive design
- React hooks for state management