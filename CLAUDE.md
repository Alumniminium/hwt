# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

Hardware Tycoon is a business simulation game consisting of:
- **Backend API** (`hardware-tycoon-api/`): ASP.NET Core Web API (.NET 9) that manages game simulation
- **Frontend** (`frontend/`): Vanilla JavaScript SPA with HTML/CSS interface

## Development Commands

### Backend (ASP.NET Core)
```bash
# Run the API server
cd hardware-tycoon-api
dotnet run

# Build the project
dotnet build

# Restore packages
dotnet restore
```

The API runs on:
- HTTPS: https://localhost:5001
- HTTP: http://localhost:5000
- Swagger UI: https://localhost:5001/swagger

### Frontend
The frontend is served as static files. Open `frontend/index.html` or `frontend/game.html` in a browser, or serve via a local web server.

Frontend expects the API to be available at `http://localhost/api/` (see `frontend/js/api.js`).

## Architecture

### Backend Core Components
- **Core.cs**: Central registry for games, components, research projects, and competitor data
- **Game.cs**: Main game instance containing simulation state and timer
- **World.cs**: Game world containing companies, market, and date progression
- **GameService.cs**: Business logic layer for game operations
- **GameController.cs**: REST API endpoints for game interactions

### Simulation Flow
1. Player creates company via `/api/login` 
2. Game instance created in `Core.Games` dictionary with unique ID
3. Frontend polls `/api/update` for game state updates
4. Player actions (research, development) sent via specific API endpoints
5. `GameTimer` advances simulation in daily steps via `SimulationStep()`

### Key Game Entities
- **Ceo**: Player or NPC company leader
- **Company**: Base class, with `PlayerCompany` and `NpcCompany` subclasses  
- **Market**: Manages product sales and competitor releases
- **RndProject**: Research projects with prerequisites and costs
- **Part/Product**: Components and final products in the game

### Frontend Structure
- **api.js**: All backend communication and game state management
- **game-screen.js**: Main game interface and UI updates
- **modal.js**: Modal dialog system for research, development, etc.
- **research.js**: Research interface and progress tracking
- **newspaper.js**: In-game news system for market events

## Code Conventions
- Use file-scoped namespaces: `namespace hardware_tycoon_api;`
- No braces for single-line if statements
- API returns DTOs for data transfer
- Game state persisted only in memory (no database)
- Frontend uses ES6 modules and async/await patterns
