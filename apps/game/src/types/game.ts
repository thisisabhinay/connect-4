/**
 * Defines coordinates on the game board using zero-based indexing
 * Used for tracking piece positions and winning combinations
 */
export type Position = {
  row: number;
  col: number;
};

/**
 * Represents possible winning patterns on the board
 * Horizontal wins check rows, vertical checks columns
 * Diagonal checks top-left to bottom-right
 * AntiDiagonal checks top-right to bottom-left
 */
export type WinningDirection =
  | "horizontal"
  | "vertical"
  | "diagonal"
  | "antiDiagonal";

/**
 * String key format for the normalized board state
 * Combines row and column indices with underscore separator
 * Used to convert 2D board positions into 1D object keys
 */
export type NormalKey = `${number}_${number}`;

/**
 * Maps player IDs to their display names
 * Key is numeric player identifier, value is player's chosen name
 */
export type PlayerName = { [key: number]: string };

/**
 * Tracks mapping between player identifiers
 * Used for synchronizing player IDs across different game instances
 */
export type PlayerMap = { [key: number]: number };

/**
 * One-dimensional representation of the game board
 * Keys are row_col strings, values are player IDs occupying that cell
 * Empty cells are omitted from this object
 */
export interface NormalizedGameState {
  [key: NormalKey]: number;
}

/**
 * Core game state containing all information needed for gameplay
 * Board stores occupied positions, tracking both players who just moved
 * Dimensions define board size, winner/cells track victory state
 * PlayerNames maintain display names for UI presentation
 */
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

/**
 * Extends Game with persistence metadata
 * ID uniquely identifies game instance for storage/retrieval
 * LastUpdate tracks when game state was last modified
 */
export interface GameResource extends Game {
  id: string;
  lastUpdate: string;
}
