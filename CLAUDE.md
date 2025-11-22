# CLAUDE.md - Hardware Tycoon Project Guide for AI Assistants

Last Updated: 2025-11-22

## Project Overview

**Hardware Tycoon** is a full-stack web-based business simulation game where players manage a semiconductor/hardware company. The game simulates running a tech company from 1970 onwards, competing with historical companies like Intel by researching technology, developing products, and managing a business.

### Key Characteristics
- Real-time simulation with variable game speeds (pause, 1x, 2x, 6x)
- Historical accuracy: NPC competitors release products based on real historical data
- Technology progression: Research tree from 10um to 3um fabrication processes
- Product development: Create CPUs, GPUs, and memory products
- Market simulation: Products compete based on performance and price

## Architecture

### High-Level Structure

```
hwt/
├── frontend/              # Legacy: Static HTML/CSS/JS web application
├── frontend-solid/        # NEW: Modern SolidJS + TypeScript frontend
├── hardware-tycoon-api/   # ASP.NET Core 5.0 Web API
├── .vscode/               # VSCode debug/build configuration
└── Untitled-1.dib         # C# polyglot notebook for game balance calculations
```

### Technology Stack

#### Backend (`hardware-tycoon-api/`)
- **Framework**: ASP.NET Core 5.0 (C#)
- **Runtime**: .NET 5.0
- **API Documentation**: Swagger/Swashbuckle 5.6.3
- **Architecture**: Layered (Controllers → Services → Simulation Engine)
- **State Management**: In-memory static dictionaries (no database)
- **Threading**: Background `GameTimer` thread for real-time simulation

#### Frontend - Legacy (`frontend/`)
- **Pure Vanilla JavaScript**: ES6 modules, no frameworks
- **Zero build tools**: Runs directly in browser
- **State**: LocalStorage for gameId/ceoId persistence
- **API Communication**: Native Fetch API
- **UI Pattern**: Modal-based interface with context menus

#### Frontend - Modern (`frontend-solid/`) **RECOMMENDED**
- **Framework**: SolidJS 1.x with TypeScript
- **Build Tool**: Vite 7.x with Hot Module Replacement
- **Routing**: @solidjs/router for client-side navigation
- **State Management**: SolidJS stores with reactive signals
- **Type Safety**: Full TypeScript with strict mode
- **UI Architecture**: Component-based with reactive updates
- **API Layer**: Type-safe API service with error handling
- **Dev Server**: http://localhost:5173 (Vite default)

## Directory Structure & Key Files

### Backend Structure

```
hardware-tycoon-api/
├── Controllers/
│   └── GameController.cs           # RESTful API endpoints
├── Services/
│   └── GameService.cs              # Business logic layer, game instance management
├── DTOs/                           # Data Transfer Objects (C# 9 records)
│   ├── LoginRequestDto.cs
│   ├── SimulationUpdateDto.cs
│   ├── UpdateDto.cs
│   └── ResearchRequestResponseDto.cs
├── Simulation/                     # Core game engine
│   ├── Components/                 # Game object models
│   │   ├── Part.cs                # Hardware parts (CPU cores, caches, etc.)
│   │   ├── Product.cs             # Finished products (CPUs, GPUs, memory)
│   │   ├── Transistor.cs          # Transistor-level specifications
│   │   └── Wafer.cs               # Silicon wafer production
│   ├── Entities/                  # Business entities
│   │   ├── Ceo.cs                 # Player CEO
│   │   ├── Company.cs             # Abstract base class
│   │   ├── PlayerCompany.cs       # Player-controlled company
│   │   ├── NpcCompany.cs          # AI competitor companies
│   │   └── SemiconductorFactory.cs # Manufacturing facility
│   ├── Enums/
│   │   └── ProductType.cs         # CPU, GPU, MEMORY
│   ├── Core.cs                    # Static registry: Games, Components, Research
│   ├── Game.cs                    # Game instance, world state
│   ├── GameTimer.cs               # Background thread for simulation ticks
│   ├── Market.cs                  # Global market (WIP)
│   ├── Project.cs                 # R&D research projects
│   └── World.cs                   # Game world container
├── Database/
│   └── Competitors/
│       ├── Intel.tsv              # 36 Intel products (1971-present)
│       └── AMD.tsv                # Placeholder (empty)
├── Program.cs                     # Application entry point
├── Startup.cs                     # ASP.NET middleware/DI configuration
├── appsettings.json               # App configuration
└── hardware-tycoon-api.csproj     # Project file
```

### Frontend Structure - Legacy (`frontend/`)

```
frontend/
├── js/
│   ├── api.js                     # Backend API communication layer
│   ├── game-screen.js             # Main game UI controller, polling loop
│   ├── main-menu.js               # Menu screen controller
│   ├── modal.js                   # Modal dialog system
│   ├── context-menu.js            # Right-click context menu
│   ├── research.js                # R&D UI logic
│   ├── newspaper.js               # News/notification system
│   └── utility.js                 # Helper functions, formatters
├── css/
│   ├── colors.css                 # Color scheme variables
│   ├── GameScreen.css             # Main game screen styles
│   ├── Menu.css                   # Menu screen styles
│   ├── context-menu.css
│   └── modals/                    # Modal-specific styles
│       ├── modal.css
│       ├── research.css
│       ├── market.css
│       ├── adcampain.css
│       ├── developmnet.css        # Note: typo in filename
│       └── newspaper.css
├── images/                        # 42 image assets
├── index.html                     # Main menu page
├── game.html                      # Game screen page
└── test.html                      # Manual testing page
```

### Frontend Structure - Modern (`frontend-solid/`) **RECOMMENDED**

```
frontend-solid/
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── modals/               # Modal dialog components
│   │   │   ├── Modal.tsx         # Base draggable modal component
│   │   │   ├── ResearchModal.tsx # R&D interface with project list
│   │   │   ├── DevelopModal.tsx  # Product development (placeholder)
│   │   │   ├── MarketModal.tsx   # Market analysis (placeholder)
│   │   │   ├── AdvertisingModal.tsx  # Ad campaigns (placeholder)
│   │   │   ├── NewspaperModal.tsx    # Product announcement notifications
│   │   │   └── Modal.css         # Modal styles
│   │   ├── ContextMenu.tsx       # Right-click context menu
│   │   └── ContextMenu.css
│   ├── pages/                    # Route page components
│   │   ├── MainMenu.tsx          # Game creation & settings
│   │   ├── MainMenu.css
│   │   ├── GameScreen.tsx        # Main game UI with polling & controls
│   │   └── GameScreen.css
│   ├── services/                 # External services
│   │   └── api.ts                # Type-safe API client class
│   ├── stores/                   # Global state management
│   │   └── gameStore.ts          # Game state store with signals
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # All interfaces & types
│   ├── utils/                    # Utility functions
│   │   └── formatting.ts         # Money/date formatters
│   ├── App.tsx                   # Root component with router
│   ├── App.css
│   ├── index.tsx                 # Application entry point
│   └── index.css                 # Global styles
├── public/
│   └── images/                   # Static assets (copied from legacy)
├── dist/                         # Production build output (gitignored)
├── node_modules/                 # NPM dependencies (gitignored)
├── package.json                  # NPM configuration & scripts
├── package-lock.json
├── tsconfig.json                 # TypeScript configuration
├── vite.config.ts                # Vite build configuration
└── README.md                     # Frontend-specific documentation
```

## Development Workflow

### Building and Running

#### Backend
```bash
cd hardware-tycoon-api

# Build
dotnet build

# Run (ports 5000/5001)
dotnet run

# Watch mode (hot reload)
dotnet watch run

# Swagger UI available at: http://localhost:5001/swagger
```

#### Frontend - Legacy
```bash
# Static files, no build required
# Served from port 3000 (see .vscode/launch.json)
# API calls hardcoded to http://localhost/api/* (note: NOT localhost:5000)
# Open frontend/index.html in browser or use F5 debug in VSCode
```

#### Frontend - Modern (SolidJS) **RECOMMENDED**
```bash
cd frontend-solid

# Install dependencies (first time only)
npm install

# Development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Important**: Ensure backend is running on port 5001 before starting frontend.
API base URL is configured in `src/services/api.ts`

### Debugging
- **VSCode F5**: Multiple launch configurations available
- **Backend (.NET Core Launch)**: Debugger attaches to .NET process on port 5000/5001
  - Pre-launch: Automatically runs `dotnet build`
- **Frontend (Legacy)**: Launches Chromium pointing to port 3000
- **Frontend (SolidJS)**: Launches Chromium pointing to http://localhost:5173
  - Requires `npm run dev` to be running separately
- **Browser DevTools**: Essential for frontend debugging (F12 in Chromium)

### Git Workflow
- **Current Branch**: `claude/claude-md-mi9z1jy4rfn61xpv-01EhkpMxsAG7LesbZnjNJEWt`
- **Branch Pattern**: All development on `claude/*` branches with session ID
- **Push Command**: Use `git push -u origin <branch-name>` (branch must start with `claude/`)

## Key Design Patterns & Conventions

### Backend Patterns

#### 1. Static Core Registry Pattern
**Location**: `Simulation/Core.cs`
```csharp
public static class Core
{
    public static Dictionary<string, Game> Games = new();
    public static List<Part> Components = new();
    public static List<Project> ResearchProjects = new();
}
```
- **All game state** stored in static dictionaries
- No database or persistence layer
- Games identified by GUID strings
- **Critical**: Thread-safe access not guaranteed

#### 2. Layered Architecture
**Flow**: Controller → Service → Simulation Engine
- `GameController.cs`: HTTP endpoints, request validation
- `GameService.cs`: Business logic, game instance management
- `Simulation/*`: Core game mechanics

#### 3. DTO Pattern
- All API contracts use C# 9 record types
- Immutable data transfer objects
- Located in `DTOs/` directory

#### 4. Abstract Company Hierarchy
```csharp
Company (abstract)
├── PlayerCompany
└── NpcCompany
```
- Polymorphic behavior for player vs. AI companies
- NPCs load historical data from TSV files

#### 5. Background Simulation Timer
**Location**: `Simulation/GameTimer.cs`
- Separate thread runs simulation ticks
- Variable speed: 0x (paused), 1x, 2x, 6x
- Each tick = 1 game day
- **Caution**: Potential concurrency issues with static state

### Frontend Patterns - Legacy (`frontend/`)

#### 1. ES6 Module Pattern
- Each JS file exports classes/functions via ES6 modules
- No bundler, modules loaded directly by browser

#### 2. Singleton Services
- `API` instance in `api.js`
- `Modal` system in `modal.js`
- `ContextMenu` in `context-menu.js`

#### 3. Polling Loop
**Location**: `game-screen.js`
- 1-second interval calls `/api/update`
- Updates UI with latest game state
- Handles gameId/ceoId from localStorage

#### 4. Modal-Based UI
- All major interactions use modals: Research, Development, Market, Advertising
- Draggable modal windows
- Context menu for quick actions

### Frontend Patterns - Modern (`frontend-solid/`)

#### 1. Component-Based Architecture
- **Functional components**: All components are functions returning JSX
- **Props-based**: Data flows down via typed props interfaces
- **Composition**: Components compose smaller components
- **Co-located styles**: Each component has its own CSS file

#### 2. Reactive State Management with SolidJS Stores
**Location**: `stores/gameStore.ts`
```typescript
// Create reactive store
const [gameState, setGameState] = createStore<GameState>(initialState);

// Create signals for UI state
const [currentModal, setCurrentModal] = createSignal<string | null>(null);

// Reactive updates automatically propagate to UI
setGameState('money', newAmount); // UI updates automatically
```

Key patterns:
- **Stores** for complex, nested state (game state)
- **Signals** for simple values (current modal, loading states)
- **Computed values** with reactive getters
- **Effects** for side effects (polling, timers)

#### 3. Polling with Effects
**Location**: `pages/GameScreen.tsx`
```typescript
onMount(() => {
  const timerId = setInterval(fetchGameState, 1000);
  onCleanup(() => clearInterval(timerId));
});
```
- Uses SolidJS lifecycle for clean polling setup/teardown
- State updates trigger reactive UI re-renders
- No manual DOM manipulation required

#### 4. Type-Safe API Layer
**Location**: `services/api.ts`
- Single `APIService` class with typed methods
- All requests/responses use TypeScript interfaces
- Centralized error handling
- Singleton pattern: `export const apiService = new APIService()`

#### 5. Client-Side Routing
**Location**: `App.tsx`
```typescript
<Router>
  <Route path="/" component={MainMenu} />
  <Route path="/game" component={GameScreen} />
</Router>
```
- Declarative route definitions
- Type-safe navigation with `useNavigate()`
- Automatic route-based code splitting (future enhancement)

#### 6. Modal System
**Pattern**: Reusable base `Modal` component with specific modal implementations
- **Base Modal** (`Modal.tsx`): Draggable, closeable, keyboard support (Escape key)
- **Specific Modals**: ResearchModal, DevelopModal, etc. compose the base Modal
- **State-driven**: Modal visibility controlled by `currentModal` signal
- **Escape key handling**: Global event listener in Modal component

#### 7. Resource Loading
**Pattern**: SolidJS `createResource` for async data fetching
```typescript
const [researchList, { refetch }] = createResource(
  () => props.isOpen && gameState.gameId && gameState.ceoId,
  async () => apiService.getResearchList(gameState.gameId!, gameState.ceoId!)
);
```
- Automatic loading states
- Re-fetch on dependency changes
- Suspense-friendly (fallback UI while loading)

#### 8. LocalStorage Integration
**Location**: `stores/gameStore.ts`
- Game credentials persisted to localStorage on login
- State initialized from localStorage on app load
- Cleared on logout or game-not-found errors

#### 9. TypeScript Patterns
- **Interface segregation**: Separate interfaces for Props, State, API types
- **Type imports**: Use `import type` for type-only imports
- **Strict mode**: Full TypeScript strict mode enabled
- **No `any` types**: All values properly typed

## API Reference

### Endpoints

#### POST /api/login
Create new game instance
```json
Request: {
  "CompanyName": "string",
  "CeoName": "string",
  "Difficulty": 1
}
Response: {
  "GameId": "guid",
  "CeoId": "guid"
}
```

#### GET /api/update?gameId={guid}&ceoId={guid}
Fetch current game state (polled every 1 second)
```json
Response: {
  "Date": "1970-04-20T00:00:00",
  "Money": 1000000,
  "MillisecondsPerDay": 1000,
  "MarketProducts": []
}
```

#### POST /api/update
Update game speed
```json
Request: {
  "GameId": "guid",
  "CeoId": "guid",
  "GameSpeed": 1  // 0=pause, 1=1x, 2=2x, 6=6x
}
```

#### GET /api/research?gameId={guid}&ceoId={guid}
List available and completed research projects
```json
Response: [
  {
    "Name": "10um Fab Process",
    "Price": 50000,
    "Description": "...",
    "Completed": false
  }
]
```

#### PUT /api/research
Start research project
```json
Request: {
  "GameId": "guid",
  "CeoId": "guid",
  "ResearchProject": "10um Fab Process"
}
Response: {
  "Success": true,
  "SecondsUntilDone": 120,
  "DebugInfo": "..."
}
```

#### PUT /api/develop
Develop new product (partially implemented)
```json
Request: {
  "GameId": "guid",
  "CeoId": "guid",
  "Name": "Product Name",
  "Components": [],
  "Type": "CPU",
  "Price": 100
}
```

## Game Mechanics

### Simulation Loop
1. Background thread ticks at variable speed (controlled by `MillisecondsPerDay`)
2. Each tick advances `World.Date` by 1 day (starts April 20, 1970)
3. Companies process: R&D progress, production, sales (WIP)
4. NPC companies release products on historical schedule
5. Market updates product listings
6. Frontend polls `/api/update` every second

### Research System
- Technology tree with prerequisites
- Research projects cost money and time (progress points)
- Unlocks:
  - **Fab Processes**: 10um, 5um, 3um (smaller = more transistors)
  - **Packaging**: DIP-4, DIP-8, DIP-16 (more pins = more features)
  - **Features**: Instruction Cache, Data Cache, Branch Prediction

### Product Development
- Combine researched parts into products
- Products have: Name, Family, Socket, Components[], Price
- Development cost based on component complexity
- Products compete in global market (implementation WIP)

### Component Hierarchy
```
Product
├── Part (CPU core, cache, etc.)
│   └── Transistor (gate size, count)
└── Wafer (silicon, fabrication cost)
```
- Each level aggregates: Cost, Performance, Power Usage
- Wafer calculations use realistic cost models (see `Untitled-1.dib`)

### Historical Competitors
**Location**: `Database/Competitors/*.tsv`
- Tab-separated files with product release dates
- Intel: 36 products from 1971-present (8086, Pentium, Core i7, etc.)
- NPC companies release these products on schedule in-game
- Newspaper notifications for releases

## Critical Notes for AI Assistants

### State Management
1. **No Persistence**: All game state is in-memory in `Core.Games` dictionary
   - Server restart = all games lost
   - No database, no serialization
   - Games never cleaned up (potential memory leak)

2. **LocalStorage Dependency**: Frontend stores `gameId` and `ceoId` in localStorage
   - Clearing browser data loses game access
   - No account system or user authentication

### Concurrency Issues
3. **Thread Safety**: `GameTimer` background thread accesses static `Core.Games` concurrently
   - No locks or synchronization primitives
   - Potential race conditions on game state updates
   - Consider this when modifying simulation logic

### Hardcoded Configuration
4. **API URL Mismatch**: Frontend uses `http://localhost/api/*`
   - Backend runs on `localhost:5000/5001`
   - Requires reverse proxy or URL change for deployment
   - Check `frontend/js/api.js` for API base URL

5. **No Environment Configuration**: Settings hardcoded, not environment-based
   - Port numbers in `launchSettings.json`
   - API URLs in JavaScript files
   - No `.env` files or configuration system

### Work-in-Progress Features
6. **Market System**: Exists but mostly stubbed out
   - `Market.cs` has product tracking
   - Sales/revenue logic commented out or incomplete
   - Frontend has market modal but limited functionality

7. **Advertising System**: UI exists but backend not implemented
   - `adcampain.css` and modal defined
   - No corresponding API endpoint
   - No ad campaign logic in simulation

8. **Product Development**: Partially implemented
   - `/api/develop` endpoint exists
   - Backend creates products but integration incomplete
   - Development costs and time calculations need work

### Data Limitations
9. **Competitor Data**: Only Intel populated
   - `Intel.tsv`: 36 products (1971-present)
   - `AMD.tsv`: Empty placeholder
   - No other competitor companies (Motorola, ARM, etc.)

10. **Game Balance**: Uses polyglot notebook for calculations
    - `Untitled-1.dib` contains wafer cost formulas
    - Shows attention to realism but values may need tuning
    - Research costs and times are rough estimates

### Code Quality
11. **No Tests**: Zero testing infrastructure
    - No unit tests, integration tests, or E2E tests
    - No testing framework dependencies
    - `test.html` is manual/exploratory only

12. **Minimal Documentation**: Code comments are sparse
    - No XML documentation comments on public APIs
    - No README files in subdirectories
    - Swagger provides API docs but only for endpoint signatures

13. **No Authentication/Authorization**: Multi-game support exists but no security
    - Anyone with `gameId` and `ceoId` can access/modify games
    - No user accounts or sessions
    - Not production-ready

## Common Development Tasks

### Adding a New Research Project
1. Add entry to `Core.ResearchProjects` initialization in `Core.cs`
2. Define prerequisites using existing project references
3. Set cost, points required, and description
4. Frontend automatically discovers via `/api/research` endpoint

### Creating a New API Endpoint
1. Add method to `Controllers/GameController.cs` with HTTP verb attribute
2. Add business logic to `Services/GameService.cs` if needed
3. Create DTO in `DTOs/` for request/response if needed
4. Update frontend `api.js` with new API call method
5. Wire up UI in appropriate screen/modal JavaScript file

### Adding a New Game Component
1. Define class in `Simulation/Components/` (extend appropriate base)
2. Add factory method or initialization in `Core.cs`
3. Integrate into component hierarchy (Product → Part → Transistor)
4. Update cost/performance calculation logic
5. Add to development UI in frontend

### Modifying Game Speed/Simulation
1. Backend: `Simulation/GameTimer.cs` controls tick rate
2. Frontend: `game-screen.js` has speed buttons (pause, 1x, 2x, 6x)
3. Speed multipliers affect `MillisecondsPerDay` calculation
4. Changes propagate via `/api/update` polling

### Adding Historical Competitor Data
1. Create/edit TSV file in `Database/Competitors/`
2. Format: Tab-separated with columns (see `Intel.tsv` for example)
3. `NpcCompany.cs` loads TSV on initialization
4. Products auto-release on matching game dates
5. Newspaper system notifies player of releases

## Naming Conventions

### C# Backend
- **Classes**: PascalCase (`GameController`, `PlayerCompany`)
- **Methods**: PascalCase (`GetGameState`, `StartResearch`)
- **Properties**: PascalCase (`CompanyName`, `Money`)
- **Fields**: camelCase (mostly properties used instead)
- **Constants**: PascalCase or UPPER_SNAKE_CASE
- **Files**: Match class name exactly (`Game.cs` for `Game` class)

### Frontend JavaScript
- **Files**: kebab-case (`game-screen.js`, `context-menu.js`)
- **Classes**: PascalCase (`Modal`, `ContextMenu`)
- **Functions**: camelCase (`formatMoney`, `updateGameState`)
- **Variables**: camelCase (`gameId`, `ceoId`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### CSS
- **Files**: kebab-case or PascalCase (`GameScreen.css`, `context-menu.css`)
- **Classes**: kebab-case (`.modal-content`, `.game-controls`)
- **IDs**: kebab-case (`#game-screen`, `#research-modal`)

## File Modification Guidelines

### When Editing Backend Code
- Maintain layered architecture: keep controllers thin, logic in services
- Don't break existing API contracts (frontend depends on exact JSON structure)
- Consider thread safety if modifying `Core` static state
- Update Swagger comments if changing API signatures
- Test with Swagger UI before frontend testing

### When Editing Frontend Code
- Preserve localStorage keys (`gameId`, `ceoId`)
- Maintain polling interval (1 second is balanced for responsiveness)
- Keep modal system consistent (use existing `modal.js` utilities)
- Update both HTML and JavaScript when adding UI elements
- Test in browser DevTools for console errors

### When Adding Dependencies
- **Backend**: Add via `dotnet add package`, updates `.csproj`
- **Frontend**: Avoid if possible (zero-dependency design)
  - If necessary, use CDN or vendor files in `frontend/js/lib/`

## Testing Approach

Since no automated testing exists, follow manual testing procedures:

### Backend Testing
1. Run backend with `dotnet run`
2. Open Swagger UI: `http://localhost:5001/swagger`
3. Test endpoints in sequence: login → update → research → develop
4. Verify JSON responses match expected schema
5. Check console output for errors

### Frontend Testing
1. Open `frontend/index.html` in browser
2. Open DevTools Console (F12)
3. Create new game, verify localStorage set
4. Navigate to game screen
5. Test all modals: Research, Development, Market
6. Verify polling updates (watch Network tab)
7. Test game speed controls

### Integration Testing
1. Run backend on port 5000/5001
2. Configure frontend API URL if needed
3. Test full game flow: login → research → develop → sell
4. Verify data consistency between frontend and backend
5. Test multiple concurrent games (multi-tab browser)

## Project History & Context

### Recent Development Activity
- Recent commits: "major refactor", "more cleanup"
- Active refactoring indicates code evolution
- No stable release or version tags visible

### Design Philosophy
- **Realism**: Historical accuracy, realistic cost calculations
- **Simplicity**: No frameworks, minimal dependencies
- **Iteration**: WIP features suggest incremental development
- **Solo Project**: Code style suggests single developer

### Known Issues & TODOs
- Market sales system incomplete
- Advertising system not implemented
- No product development completion logic
- Thread safety concerns in `GameTimer`
- API URL hardcoded incorrectly for deployment
- No data persistence (games lost on restart)
- AMD competitor data missing

## Useful Utilities

### Frontend Utilities (`utility.js`)
- `formatMoney(value)`: Formats numbers as currency
- `formatDate(dateString)`: Formats ISO dates for display
- Additional helpers for UI formatting

### Backend Utilities
- `Core.cs`: Static registry access
- `GameService.cs`: Static game instance lookup by ID

## Quick Reference

### Start Development
```bash
# Terminal 1: Backend
cd hardware-tycoon-api
dotnet watch run

# Terminal 2: Frontend (if using web server)
cd frontend
python3 -m http.server 3000

# Or use VSCode F5 to launch both
```

### Key URLs
- Frontend: `http://localhost:3000/frontend/index.html`
- Backend API: `http://localhost:5001/api/`
- Swagger UI: `http://localhost:5001/swagger`

### Important State Locations
- **Backend Game State**: `Core.Games` dictionary in memory
- **Frontend Game State**: `localStorage.gameId` and `localStorage.ceoId`
- **Historical Data**: `Database/Competitors/*.tsv`
- **Research Definitions**: `Core.ResearchProjects` in `Core.cs`

### Common File Pairs (Frontend ↔ Backend)
- `game-screen.js` ↔ `GameController.cs`
- `research.js` ↔ `GameService.cs` (research methods)
- `api.js` ↔ All controller endpoints

## Conclusion

This codebase represents a well-structured but incomplete simulation game. The architecture is clean and maintainable, but lacks production-ready features like persistence, testing, and authentication. When working with this code:

1. **Respect the architecture**: Maintain separation of concerns
2. **Test manually**: No automated tests means thorough manual verification
3. **Consider state**: In-memory state is fragile, plan accordingly
4. **Preserve simplicity**: Zero-dependency frontend is a feature, not a bug
5. **Document changes**: Update this file when making significant modifications

The project shows promise with its attention to historical accuracy and realistic simulation mechanics. Focus efforts on completing WIP features and adding persistence before introducing new complexity.
