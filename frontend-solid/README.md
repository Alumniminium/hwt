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
- **.NET 5.0+** for running the backend API
- Hardware Tycoon API running on `http://localhost:5001`

### Installation

```bash
# Install frontend dependencies
npm install
```

### Running the Application

**IMPORTANT:** You must run both the backend API and frontend dev server.

#### Terminal 1: Start Backend API
```bash
cd ../hardware-tycoon-api
dotnet run
```

The API should start on `http://localhost:5001`

#### Terminal 2: Start Frontend Dev Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

**Troubleshooting:** If you see "Cannot connect to game server" when creating a game, ensure the backend API is running on port 5001.

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

### Game Features
- **3D Isometric Garage Background** - Flat-shaded minimalist garage scene using THREE.js
- **Wafer Designer** - Interactive silicon wafer visualization tool with die layout and defect simulation
- **Real-time Simulation** - Variable game speeds (Pause, 1x, 2x, 6x) with live date/money updates
- **Research System** - Technology tree for unlocking new fabrication processes and features
- **Product Development** - Design and manufacture CPUs, GPUs, and memory products
- **Market Analysis** - Track competitor products and market trends
- **Newspaper Notifications** - Automatic alerts when competitors release new products

### Technical Features
- **Real-time game state polling** - Updates every second from backend API
- **Reactive UI with SolidJS** - Fast, fine-grained reactivity
- **Draggable modal windows** - All modals are draggable and closeable (Escape key)
- **TypeScript type safety** - Full type coverage with strict mode
- **Client-side routing** - Seamless navigation with @solidjs/router
- **LocalStorage persistence** - Game credentials saved locally
- **Context menu** - Right-click anywhere for quick access to game features

## Learn More

- [SolidJS Website](https://solidjs.com)
- [SolidJS Discord](https://discord.com/invite/solidjs)
