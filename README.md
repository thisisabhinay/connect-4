# Connect 4 Game

A modern take on the classic Connect 4 game built with Next.js, featuring local two-player gameplay, game state persistence, and a charming retro-styled user interface inspired by the NES era. Players take turns dropping colored discs on the same device, with the goal of connecting four of their pieces in a row, either horizontally, vertically, or diagonally. The game state is saved after each move, allowing players to resume their match later.

## Features

- **Retro-Styled UI**: Implements NES.css for a nostalgic, 8-bit visual aesthetic
- **Customizable Game Board**: Players can set custom board dimensions (minimum 4x4)
- **Real-time Game State**: Maintains game state across sessions using a JSON server
- **Sound Effects**: Includes retro-style sound effects and background music
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Game Session Management**: Supports saving and resuming games
- **Win Detection**: Implements sophisticated win detection for horizontal, vertical, and diagonal matches
- **Player Turns**: Visual indicators for active player turns
- **Game Over States**: Handles wins, draws, and displays victory animations

## Project Structure

The project follows a monorepo structure using a custom setup:

```
connect-4/
├── apps/
│   ├── game/           # Frontend Next.js application
│   │   ├── src/        # Source code
│   │   ├── public/     # Static assets
│   └── server/         # Backend JSON server
└── packages/           # Shared packages
```

### Key Directories

- `apps/game/src/components/`: React components for the game UI
- `apps/game/src/hooks/`: Custom React hooks for game logic
- `apps/game/src/actions/`: Server actions for game state management
- `apps/game/src/utils/`: Utility functions and helpers
- `apps/server/`: JSON server implementation for game state persistence

## Technology Stack

- **Frontend**:

  - Next.js 14 (React Framework)
  - TypeScript
  - Tailwind CSS
  - NES.css (Retro styling)
  - React Confetti (Victory animations)

- **Backend**:

  - JSON Server (REST API)
  - Node.js

- **State Management**:
  - React Hooks
  - Server Actions
  - Local Storage for game persistence

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/thisisabhinay/connect-4.git
cd connect-4
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:
   Create a `.env.local` file in the `apps/game` directory:

```
NEXT_PUBLIC_GAME_URL=http://localhost:9000/game
```

4. Start the development servers:

For the backend:

```bash
cd apps/server
yarn dev
```

For the frontend:

```bash
cd apps/game
yarn dev
```

5. Open `http://localhost:3000` in your browser

## Game Architecture

### Frontend Architecture

The frontend follows the RADIO framework principles:

1. **Requirements**: Handles game setup, player interactions, and win conditions
2. **Architecture**: Component-based structure with clear separation of concerns
3. **Data Model**: Uses TypeScript interfaces for game state and player information
4. **Interface**: Clean API between components and server
5. **Optimizations**: Implements performance optimizations and smooth animations

### State Management

The game implements a sophisticated state management system centered around the `useGameState` custom hook. This hook serves as the central nervous system of the game, managing both the game's logic and state updates.

The state management system is built on several key principles:

1. **Immutable State Updates**: The game state is updated using immutable patterns, ensuring that each state change creates a new state object rather than modifying the existing one. This approach helps prevent bugs and makes state changes more predictable. For example, when a player makes a move, the entire board state is copied and then updated:

```typescript
setGameState((prev) => ({
  ...prev,
  board: {
    ...prev.board,
    [`${row}_${col}`]: prev.activePlayer,
  },
}));
```

2. **Normalized State Structure**: The game board is stored in a normalized format using a key-value structure where each key represents a cell position (e.g., "0_0", "0_1"). This makes it efficient to:

   - Update individual cell states
   - Check for win conditions
   - Serialize the state for storage
   - Restore game state from storage

3. **State Persistence**: The game state is automatically persisted to both:

   - Local storage (for quick game resumption)
   - Backend server (for game sharing and longer-term persistence)

4. **Reactive Updates**: The state management system uses React's built-in state management capabilities along with effects to ensure that:
   - UI updates are performed efficiently
   - Game rules are enforced consistently
   - Win conditions are checked after each move
   - Player turns are managed automatically

Here's how different aspects of the state are managed:

```typescript
interface GameState {
  board: NormalizedGameState; // Current board state
  activePlayer: number; // Current player's turn
  lastPlayer: number; // Previous player
  isGameOver: boolean; // Game end state
  winner: number; // Winning player (if any)
  winningCells: Position[]; // Winning combination
  playerNames: PlayerName; // Player information
}
```

### Backend Architecture

The backend architecture is built using JSON Server, which provides a full fake REST API with zero coding required. This architecture was chosen for its simplicity and rapid development capabilities while still providing robust functionality for the game's needs.

The backend architecture is structured around several key components:

1. **RESTful API Endpoints**:

   - `GET /game/:id` - Retrieves a specific game session
   - `POST /game` - Creates a new game session
   - `PATCH /game/:id` - Updates an existing game session

   Each endpoint automatically handles data persistence and JSON transformation.

2. **Data Model**: The backend maintains a structured data model that includes:

```json
{
  "game": [
    {
      "id": "unique_id",
      "lastUpdate": "timestamp",
      "board": {
        "0_0": 0,
        "0_1": 0
        // ... rest of the board state
      },
      "activePlayer": 1,
      "lastPlayer": 2,
      "isGameOver": false,
      "winner": 0,
      "winningCells": [],
      "playerNames": {
        "1": "Player1",
        "2": "Player2"
      }
    }
  ]
}
```

3. **Middleware Configuration**:

   - CORS support for cross-origin requests
   - Body parsing for JSON payloads
   - Request logging for debugging
   - Error handling middleware

4. **Data Persistence**:

   - Uses a file-based storage system (`db.json`)
   - Automatic data synchronization
   - Transaction-like behavior for data consistency
   - Automatic ID generation for new games

5. **Server Configuration**:

```javascript
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);
```

The backend is designed to be:

- Stateless: Each request contains all the information needed to process it
- Scalable: Can handle multiple concurrent games
- Resilient: Automatic error handling and recovery
- Maintainable: Simple codebase with clear separation of concerns

## Key Components

- `GameBoard`: Main game board component
- `CoinSlot`: Individual game cell component
- `PlayerCharacter`: Player avatar and status display
- `ModalGameOver`: Game end state display
- `BackgroundMusic`: Audio management component

## Game Features Explained

### Win Detection

The game implements win detection in four directions:

- Horizontal
- Vertical
- Diagonal
- Anti-diagonal

The win detection algorithm efficiently checks for four consecutive matching pieces after each move.

### Move Validation

Moves are validated based on:

- Column fullness
- Game state (not ended)
- Turn order
- Gravity simulation (pieces fall to bottom)

### Sound System

The game features multiple sound effects:

- Move sounds for each player
- Victory jingle
- Draw game sound
- Background music (toggleable)

## Acknowledgments

- NES.css for the retro styling
- React team for the amazing framework
- JSON Server team for the backend solution

---

_*Document Information:*_
_This README document is co-generated with Claude, an AI by Anthropic._
