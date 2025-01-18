# Connect-4 Game System Design

## Requirements Exploration

The Connect-4 game implementation serves as a web-based version of the classic board game. Through examining the codebase, we can identify the key requirements that shaped its development.

### Core Use Cases

The game needs to support two primary user flows: game creation and gameplay. During game creation, players enter their names and choose board dimensions. This creates a unique game session with a clean board. During gameplay, players take turns placing pieces, with the system enforcing Connect-4 rules and checking for winning combinations.

### Functional Requirements

The game's essential functionality centers around proper rule enforcement. The system must ensure pieces "fall" to the lowest available position in a chosen column, following Connect-4's gravity mechanics. It needs to track player turns, validate moves, and detect winning combinations in all directions (horizontal, vertical, diagonal). The code in `game.ts` demonstrates this through functions like `checkWin` and `checkWinInDirection`.

### Non-Functional Requirements

Looking at the implementation, several key performance needs emerge. The game requires immediate feedback when pieces are placed, shown by the real-time updates in `GameBoard` component. The state must persist between page refreshes, handled through the JSON server backend. The UI needs to clearly show whose turn it is and highlight winning combinations when they occur.

## Architecture

The system uses a Next.js frontend with a JSON Server backend, structured around these main components:

### Frontend Components

The frontend architecture splits responsibilities between stateful and presentational components:

- `GameBoard`: The main component that renders the game grid and handles player interactions. It uses the `useGameState` hook to manage game logic.
- `CoinSlot`: A presentational component for individual board cells, handling the visual representation of pieces and click interactions.

### Backend Structure

The backend uses a simple JSON Server implementation that provides REST endpoints for:

- Creating new game sessions
- Retrieving game state
- Updating game state

This design allows for state persistence while keeping the backend implementation lightweight.

## Data Model

The data model reflects the needs of a Connect-4 game through several key structures:

```typescript
interface Game {
  board: NormalizedGameState; // Tracks piece positions
  activePlayer: number; // Current player's turn (1 or 2)
  rows: number; // Board dimensions
  cols: number;
  isGameOver: boolean; // Game completion status
  winner: number; // Winning player number
  winningCells: Position[]; // Winning combination coordinates
  playerNames: {
    // Player identification
    1: string;
    2: string;
  };
}
```

The board state uses a normalized structure with coordinates as keys for efficient access and updates. This approach simplifies state management and move validation.

## Interface Definition

The system's interfaces are designed around the core game actions:

### Server Endpoints

- `POST /game`: Creates a new game session with initial state
- `PATCH /game/:id`: Updates game state after moves
- `GET /game/:id`: Retrieves current game state

### Component Communication

The `useGameState` hook provides the interface between components and game logic:

```typescript
const {
  makeMove, // Places a piece in the specified position
  isMoveLegal, // Validates if a move is allowed
  resetGame, // Resets the board state
  getPlayerColor, // Returns the color for a player's pieces
} = useGameState(initialGameState);
```

## Optimizations

The implementation includes several key optimizations:

### Game Logic

The win detection algorithm in `checkWin` optimizes the search for winning combinations by:

- Only checking from the last placed piece
- Using direction vectors to check different winning patterns
- Early termination when a winning combination is found

### State Management

The game state is optimized through:

- Normalized board structure for O(1) access to positions
- Local state management with selective server updates
- Efficient move validation using the board's structure

### UI Performance

The interface is optimized by:

- Using Tailwind CSS for styling
- Implementing efficient grid-based board rendering
- Providing immediate visual feedback for moves

These optimizations ensure smooth gameplay while maintaining the game's rules and requirements.

---

_*Document Information:*_
_This system design document was co-generated with Claude, an AI by Anthropic._
