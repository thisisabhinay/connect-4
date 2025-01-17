# Connect 4 Game

A modern implementation of the classic Connect 4 game built with Next.js and JSON Server.

## Project Structure

The project follows a monorepo architecture with two main applications, separating the concerns between frontend and backend:

```
connect-4/
├── apps/
│   ├── game/        # Frontend Next.js application
│   └── server/      # Backend JSON Server application
```

## Features

### Core Game Features

- Customizable board dimensions allowing players to set their preferred number of rows and columns
- Game state management ensuring consistent game state across players
- Turn tracking system that alternates between players
- Win detection algorithm that checks for winning combinations in four directions:
  - Horizontal: Checks for four consecutive pieces in a row
  - Vertical: Checks for four consecutive pieces in a column
  - Diagonal: Checks for four consecutive pieces in diagonal direction (↘)
  - Anti-diagonal: Checks for four consecutive pieces in opposite diagonal direction (↗)
- Game state persistence using JSON Server backend
- Automatic draw detection when the board becomes full

### User Interface Features

- Responsive design that adapts to different screen sizes using Tailwind CSS
- Modern, clean UI implementation
- Visual feedback system including:
  - Highlighting of legal moves
  - Special styling for winning combinations
  - Clear indication of current player's turn
  - Distinctive colors for each player (Indigo for Player 1, Amber for Player 2)
- Customizable player names
- One-click "Play Again" functionality for quick game restart

## Game Rules and Mechanics

### Basic Rules

1. The game is played on a vertical grid where players drop colored coins from the top.
2. Players alternate turns, with Player 1 starting first (Indigo coins).
3. On their turn, a player can click the slot to fill their coin into any column that isn't full.
4. Slots on the lowest available position are activated in the chosen column due to simulated gravity.

### Winning Conditions

The game can end in one of three ways:

1. Victory: A player wins by connecting four of their coins in any of these patterns:

   - Horizontally: Four coins in a row (→)
   - Vertically: Four coins in a column (↓)
   - Diagonally: Four coins in either diagonal direction (↘ or ↗)

2. Draw: If the entire board fills up without either player achieving a winning connection, the game ends in a draw.

3. The winning combination is highlighted on the board when a player wins.

### Move Validation

The game implements several move validation rules:

1. Players can only place coins in columns that aren't full
2. Coins must "fall" to the lowest available position in a column
3. Players cannot place coins in invalid positions or during the opponent's turn
4. Game prevents moves after a winner is determined

## Technology Stack

### Frontend (apps/game)

- Next.js 15.1.4 for server-side rendering and routing
- React 19 with hooks for state management
- TypeScript for type safety and better development experience
- Tailwind CSS for responsive styling
- Axios for reliable API communication
- clsx for conditional class name management
- nanoid for generating unique game identifiers

### Backend (apps/server)

- JSON Server providing a full fake REST API
- Node.js runtime environment
- CORS support for cross-origin requests
- Vercel deployment configuration for seamless hosting

## Getting Started

### Prerequisites

- Node.js 20.11.1 or higher (supports modern JavaScript features)
- Pnpm 9.14.2 or higher (for package management)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd connect-4
```

2. Install dependencies using Yarn:

```bash
pnpm install
```

3. Configure environment variables:
   Create `.env.local` in the game directory with the following content:

```
NEXT_PUBLIC_GAME_URL=http://localhost:9000/game
```

### Running the Application

1. Start the backend server:

```bash
cd apps/server
pnpm dev
```

This will start the JSON Server on port 9000.

2. In a new terminal, start the frontend application:

```bash
cd apps/game
pnpm dev
```

This will start the Next.js development server on port 3000.

3. Open http://localhost:3000 in your browser to start playing

## Code Architecture

### Frontend Structure

The frontend code is organized following a feature-based architecture:

- `src/components/`: React components including:
  - GameBoard: Main game grid and game state display
  - Coin: Individual cell component with move handling
- `src/hooks/`: Custom React hooks including:
  - useGameState: Central game logic and state management
- `src/types/`: TypeScript type definitions for game entities
- `src/utils/`: Utility functions for game logic including win detection
- `src/actions/`: Server actions for game state persistence
- `src/app/`: Next.js pages and layouts

### Key Components

#### GameBoard Component

The GameBoard component serves as the main game interface:

- Manages the game grid and player interactions
- Implements turn-based gameplay logic
- Displays game status including current player and winner
- Handles the reset functionality for new games

#### CoinElement Component

The CoinElement component represents individual cells in the game grid:

- Manages click events for piece placement
- Provides visual feedback for:
  - Legal moves through hover states
  - Current piece placement
  - Winning combinations
- Implements accessibility features for better user interaction

#### useGameState Hook

This custom hook centralizes game logic:

- Manages the complete game state
- Implements move validation rules
- Handles win detection across all directions
- Manages player turns and game reset functionality
- Coordinates with the backend for state persistence

## API Endpoints

The JSON Server provides a RESTful API with these endpoints:

- `GET /game/:id`: Retrieve a specific game session
  - Returns the complete game state including board configuration and player information
- `POST /game`: Create a new game session
  - Accepts initial game configuration including board size and player names
- `PATCH /game/:id`: Update an existing game session
  - Handles move submissions and game state updates

## Development Guidelines

### Code Style

The project maintains consistent code quality through:

- ESLint configuration for code linting
- Tailwind CSS for maintainable styling
- TypeScript for type safety
- Consistent file and component naming conventions

### State Management

The game uses React's built-in state management with hooks, specifically:

- useState for local component state
- useEffect for side effects like API calls
- Custom hooks for encapsulating complex game logic

## Deployment

The project is configured for deployment on Vercel:

### Backend (JSON Server)

- Uses custom Vercel configuration in `vercel.json`
- Handles API routes and CORS
- Requires proper environment variable configuration

### Frontend (Next.js)

- Follows standard Next.js deployment process
- Requires environment variables in Vercel dashboard
- Optimized for production builds

## Acknowledgments

- Built with Next.js and JSON Server
- Styled with Tailwind CSS
- Icons by Lucide React

---

_*Document Information:*_
_This README document is co-generated with Claude, an AI by Anthropic._
