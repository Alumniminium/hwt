# Hardware Tycoon - SolidJS Frontend

This is the modern SolidJS frontend for Hardware Tycoon, built with TypeScript and Vite.

## Technology Stack

- **SolidJS** - Reactive UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **@solidjs/router** - Client-side routing
- **Solid Store** - State management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── modals/         # Modal dialog components
│   └── ContextMenu.tsx # Right-click context menu
├── pages/              # Route pages
│   ├── MainMenu.tsx    # Game menu & creation
│   └── GameScreen.tsx  # Main game screen
├── services/           # API and external services
│   └── api.ts          # Backend API client
├── stores/             # Global state management
│   └── gameStore.ts    # Game state store
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- Hardware Tycoon API running on `http://localhost:5001`

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Configuration

### API Base URL

The API base URL is configured in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:5001/api';
```

Update this to match your backend API URL.

## Key Features

- Real-time game state polling
- Reactive UI with SolidJS
- Draggable modal windows
- TypeScript type safety
- Client-side routing
- LocalStorage persistence

## Learn More

- [SolidJS Website](https://solidjs.com)
- [SolidJS Discord](https://discord.com/invite/solidjs)
