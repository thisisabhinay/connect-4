# Connect-4 Game System Design Document

# Requirements Exploration

## Functional Requirements

The system implements a Connect-4 game with the following core features:

- Two-player turn-based gameplay
- Customizable board dimensions (minimum 4x4)
- Player naming and identification
- Move validation and win detection
- Game state persistence
- Game session sharing
- Game reset and replay functionality
- Return to start screen option

## Non-Functional Requirements

- Responsive design supporting multiple screen sizes
- Real-time game state updates
- Sound effects for player moves and game events
- Visual feedback for valid moves and winning combinations
- Session persistence across page reloads
- Accessibility considerations
- Retro-style user interface with NES-inspired design

# Architecture and High-Level Design Analysis

The Connect-4 game implements a modern web architecture that separates concerns while maintaining efficient communication between components. Let's examine each layer in detail:

## Client Architecture

### Components Layer

The components layer follows a hierarchical structure where each component has a specific responsibility:

1. **GameBoard Component**

   ```typescript
   export function GameBoard({
     onPlayerUpdateAction,
     ...initalGameState
   }: GameBoard) {
     // Core game interface that manages:
     // - Board rendering
     // - Move handling
     // - Game state updates
     // - Win condition checks
   }
   ```

   This component serves as the main container for game logic and UI elements. It manages the game grid and coordinates between different sub-components.

2. **CoinSlot Component**

   ```typescript
   export function CoinSlot({
     filled,
     isAllowed,
     handlePlayerMove,
     isWinningCell,
     value,
     isGameOver,
     i,
     j,
   }: CoinSlot) {
     // Individual cell management:
     // - Move validation
     // - Visual state
     // - Player interaction
   }
   ```

   Represents individual game cells with built-in move validation and visual feedback.

3. **PlayerCharacter Component**
   ```typescript
   export function PlayerCharacter({
     isWinner,
     playerName,
     playerId,
     showBalloon,
     gameOver,
   }: PlayerCharacter) {
     // Player visualization:
     // - Turn indicators
     // - Character representation
     // - Win state display
   }
   ```
   Handles player representation and turn indication through visual elements.

### State Management Layer

The state management is handled through custom hooks that encapsulate game logic:

```typescript
export function useGameState(initialGameState: GameResource) {
  const [gameState, setGameState] = useState<GameResource>(initialGameState);

  // Game logic functions:
  const getCellValue = useCallback(...)
  const isMoveLegal = useCallback(...)
  const makeMove = useCallback(...)
  const resetGame = useCallback(...)
}
```

This approach provides:

- Centralized state management
- Encapsulated game logic
- Reusable game functionality
- Clean separation of concerns

### Service Layer

The service layer handles external communication and resource management:

1. **API Communication**

   ```typescript
   export async function updateGameSession(game: GameResource) {
     const { data } = await axios.patch(`${BASE_URL}/${game.id}`, updatedGame);
     return data;
   }
   ```

2. **Asset Management**
   ```typescript
   export const soundPlayer1 = new Audio(P1);
   export const soundPlayer2 = new Audio(P2);
   ```

## Server Architecture

The server implementation uses a lightweight JSON server approach:

```javascript
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);
```

Key features:

- REST endpoint support
- CORS enabled for client access
- JSON file-based persistence
- Middleware support for request processing

### Deployment Configuration

The server is configured for Vercel deployment:

```json
{
  "version": 2.0,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node",
      "config": {
        "includeFiles": ["db.js"]
      }
    }
  ]
}
```

This architecture provides several benefits:

1. Clear separation of concerns
2. Modular component structure
3. Efficient state management
4. Scalable server implementation
5. Easy deployment process

The design choices reflect modern web development practices while maintaining simplicity and efficiency in implementation.

# Data Model Analysis

The Connect-4 game implements a sophisticated data model that ensures type safety while maintaining efficient state management. Let's examine each aspect of the data model:

## Core Game State

The game state is built around a hierarchical type system:

```typescript
export interface Game {
  board: NormalizedGameState;
  lastPlayer: number;
  activePlayer: number;
  rows: number;
  cols: number;
  isGameOver: boolean;
  winner: number;
  winningCells: Position[];
  playerNames: PlayerName;
}
```

Let's analyze each component:

### Board State

```typescript
export type NormalKey = `${number}_${number}`;

export interface NormalizedGameState {
  [key: NormalKey]: number;
}
```

The board uses a normalized state structure where:

- Keys are type-safe string literals representing coordinates
- Values are numbers representing player moves
- Empty cells are represented by 0
- Player 1 and 2 are represented by their respective numbers

Benefits of this approach:

1. O(1) access time for any cell
2. Type safety through template literal types
3. Efficient updates without deep cloning
4. Easy serialization for API communication

### Position Tracking

```typescript
export type Position = {
  row: number;
  col: number;
};
```

Position tracking is used for:

- Win condition checking
- Move validation
- Winning cell highlighting

### Player Management

```typescript
export type PlayerName = { [key: number]: string };
export type PlayerMap = { [key: number]: number };
```

Player-related data includes:

- Name mapping for each player
- Turn management
- Win state tracking

## Extended Game Resource

For API communication and persistence, the game state is extended:

```typescript
export interface GameResource extends Game {
  id: string;
  lastUpdate: string;
}
```

This adds:

- Unique session identification
- Timestamp for state changes
- Version control support

## Style Management

The game includes a dedicated type system for styling:

```typescript
export type PlayerStyleMap = {
  [key: number]: string;
};
```

Used for:

- Player-specific colors
- Visual feedback
- Theme consistency

## State Generation and Manipulation

The system includes utilities for state management:

```typescript
export function generateEmptyBoard(
  rows: number,
  cols: number,
): NormalizedGameState {
  const emptyBoard: NormalizedGameState = {};
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const key = `${i}_${j}` as NormalKey;
      emptyBoard[key] = 0;
    }
  }
  return emptyBoard;
}
```

This structure provides:

1. Efficient state initialization
2. Type-safe board manipulation
3. Clear data organization
4. Easy state persistence

## Server-Side Data Model

The server stores game data in a JSON structure:

```json
{
  "game": [
    {
      "id": "r6bux83KpCB3TcaU_p2c3",
      "lastUpdate": "2025-01-17T15:17:58.974Z",
      "board": {
        "0_0": 0,
        "0_1": 0
        // ... rest of the board
      },
      "lastPlayer": 2,
      "activePlayer": 1
      // ... other game state
    }
  ]
}
```

This data model design creates a robust foundation for the game by:

1. Ensuring type safety throughout the application
2. Maintaining efficient state updates
3. Supporting seamless serialization
4. Enabling easy persistence
5. Facilitating clear component communication

# Interface Definition Analysis

The Connect-4 game implements a comprehensive interface system that defines clear boundaries between components and services. Let's examine each interface in detail:

## Server APIs

### Game Session Management

1. **Create Game Session**

```typescript
export async function createGameSession(formData: FormData) {
  try {
    const newGame: GameResource = {
      id: nanoid(),
      lastUpdate: new Date().toISOString(),
      board: generateEmptyBoard(rows, cols),
      // ... other initialization
    };

    const { data } = await axios.post(BASE_URL, newGame);
    return data;
  } catch (error) {
    // Error handling
  }
}
```

This endpoint:

- Accepts form data for game initialization
- Generates unique game ID
- Creates initial game state
- Returns complete game resource

2. **Update Game State**

```typescript
export async function updateGameSession(game: GameResource) {
  try {
    const updatedGame: GameResource = {
      ...game,
    };

    const { data } = await axios.patch(`${BASE_URL}/${game.id}`, updatedGame);
    return data;
  } catch (error) {
    // Error handling
  }
}
```

Handles:

- State persistence
- Move updates
- Game progression
- Win state recording

## Component Interfaces

### GameBoard Interface

```typescript
export interface GameBoard extends GameResource {
  onPlayerUpdateAction: (
    activePlayer: number,
    winner: number,
    isGameOver: boolean,
  ) => void;
}
```

Provides:

- Game state access
- Player action handling
- Win condition notification
- Game over state management

### CoinSlot Interface

```typescript
export interface CoinSlot {
  filled?: string;
  i: number;
  j: number;
  player: number;
  handlePlayerMove: (x: number, y: number) => void;
  isAllowed: boolean;
  isWinningCell: boolean;
  isGameOver: boolean;
  value: number;
}
```

Manages:

- Cell state
- Move validation
- Visual feedback
- Win highlighting

### PlayerCharacter Interface

```typescript
export interface PlayerCharacter {
  isWinner: boolean;
  playerName: string;
  playerId: number;
  showBalloon: boolean;
  gameOver: boolean;
}
```

Controls:

- Player representation
- Turn indication
- Win state display
- Visual feedback

## State Management Interfaces

### Game State Hook

```typescript
export function useGameState(initialGameState: GameResource) {
  // Returns
  return {
    ...gameState,
    makeMove,
    isBoardFull,
    isMoveLegal,
    resetGame,
    getPlayerColor,
  };
}
```

Provides:

- State access methods
- Game logic functions
- Utility methods
- Style management

### Window Size Hook

```typescript
export function useWindowSize() {
  return {
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  };
}
```

Manages:

- Responsive design
- Layout adaptation
- Window resizing

## Local Storage Interface

```typescript
export function persistLastGame(url: string) {
  localStorage.setItem(LOCAL_PERSISTENCE_KEY, url);
}

export function getLastGame(): string {
  return localStorage.getItem(LOCAL_PERSISTENCE_KEY) ?? "";
}
```

Handles:

- Game session persistence
- State recovery
- URL management

These interfaces provide several benefits:

1. Clear component boundaries
2. Type-safe interactions
3. Predictable state management
4. Efficient data flow
5. Easy maintenance and updates

The interface design ensures that:

- Components have clear responsibilities
- Data flow is predictable
- State updates are controlled
- Error handling is consistent
- Type safety is maintained throughout the application

## Optimizations and Deep Dive

### Game Logic Optimization

1. **Win Detection Algorithm**
   The game implements an efficient win detection strategy:

   - Checks only from the last moved position
   - Evaluates in four directions: horizontal, vertical, diagonal, anti-diagonal
   - Early termination when win conditions cannot be met
   - Caching of winning cell positions

2. **Move Validation**
   Implemented with efficient position-based checking:
   ```typescript
   const isMoveLegal = useCallback(
     (row: number, col: number) => {
       if (row === gameState.rows - 1) {
         return getCellValue(row, col) === 0;
       }
       return getCellValue(row, col) === 0 && getCellValue(row + 1, col) > 0;
     },
     [gameState.rows, getCellValue],
   );
   ```

# State Management Analysis

The Connect-4 game implements a sophisticated state management system that handles game logic, user interactions, and persistence. Let's examine each aspect of the state management system:

## Game State Management

### Core State Hook

```typescript
export function useGameState(initialGameState: GameResource) {
  const [gameState, setGameState] = useState<GameResource>(initialGameState);

  // Core game logic functions
  const getCellValue = useCallback(
    (row: number, col: number): number => {
      const key = `${row}_${col}`;
      return gameState.board[key as NormalKey] ?? 0;
    },
    [gameState.board],
  );

  const makeMove = useCallback(
    (row: number, col: number) => {
      if (col < 0 || col >= gameState.cols || !isMoveLegal(row, col)) return;

      setGameState((prev) => {
        const newBoard = {
          ...prev.board,
          [`${row}_${col}`]: prev.activePlayer,
        };

        // Calculate new state
        const winningCells = checkWin(/*...*/);
        const isGameOver = Boolean(winningCells.length) || isBoardFull(/*...*/);
        const activePlayer = isGameOver
          ? prev.activePlayer
          : NEXT_PLAYER_MAP[prev.activePlayer];

        // Update state with new values
        return {
          ...prev,
          lastUpdate: new Date().toISOString(),
          board: newBoard,
          lastPlayer: prev.activePlayer,
          activePlayer: activePlayer,
          isGameOver,
          winner: winningCells.length
            ? isGameOver
              ? prev.activePlayer
              : 0
            : 0,
          winningCells: winningCells || [],
        };
      });
    },
    [gameState.cols, isMoveLegal],
  );
}
```

This hook provides:

1. Centralized state management
2. Memoized utility functions
3. Atomic state updates
4. Game logic encapsulation

## State Persistence

### Local Storage Management

```typescript
export function persistLastGame(url: string) {
  localStorage.setItem(LOCAL_PERSISTENCE_KEY, "");
  localStorage.setItem(LOCAL_PERSISTENCE_KEY, url);
}

export function getLastGame(): string {
  return localStorage.getItem(LOCAL_PERSISTENCE_KEY) ?? "";
}
```

Handles:

- Game session persistence
- URL management
- State recovery

### Server State Synchronization

```typescript
export async function updateGameSession(game: GameResource) {
  try {
    const updatedGame: GameResource = {
      ...game,
    };

    const { data } = await axios.patch(`${BASE_URL}/${game.id}`, updatedGame);
    return data;
  } catch (error) {
    // Error handling
  }
}
```

# User Experience Enhancements

1. **Visual Feedback**

   - Highlighting of winning combinations
   - Turn indicators with character animations
   - Valid move highlighting
   - Confetti effects for wins

2. **Audio Integration**
   - Move sound effects
   - Background music with toggle
   - Win/draw sound effects
   - Mute persistence

# Accessibility Features

- ARIA labels for interactive elements
- Keyboard navigation support
- High contrast visual indicators
- Clear game state messaging

This design creates a scalable, maintainable, and engaging implementation of the Connect-4 game, with careful attention to both technical performance and user experience.

---

_*Document Information:*_
_This system design document was co-generated with Claude, an AI by Anthropic._
