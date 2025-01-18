import {
  Game,
  NormalizedGameState,
  NormalKey,
  Position,
  WinningDirection,
} from "@/types/game";

const EMPTY_CELL_VALUE = 0;
const WINNING_LENGTH = 4;
const DIRECTIONS = {
  horizontal: { row: 0, col: 1 },
  vertical: { row: 1, col: 0 },
  diagonal: { row: 1, col: 1 },
  antiDiagonal: { row: -1, col: 1 },
};

/**
 * Evaluates a sequence of cells in a specified direction to detect a winning combination.
 * Uses vector-based direction mapping to traverse the board from a starting position.
 * Returns early if any cell in the sequence doesn't match the player's value or exceeds board boundaries.
 *
 * @param board - Normalized game state with cell positions as keys (row_col format)
 * @param startRow - Initial row position to begin checking sequence
 * @param startCol - Initial column position to begin checking sequence
 * @param player - Numeric identifier of the current player being checked
 * @param direction - Vector direction to check (horizontal, vertical, diagonal, antiDiagonal)
 * @param rows - Total number of rows in the game board
 * @param cols - Total number of columns in the game board
 * @returns Array of winning cell positions if found, empty array otherwise
 */
export function checkWinInDirection(
  board: NormalizedGameState,
  startRow: number,
  startCol: number,
  player: number,
  direction: WinningDirection,
  rows: number,
  cols: number,
): Position[] {
  const winningCells: Position[] = [];
  const dir = DIRECTIONS[direction];

  for (let i = 0; i < WINNING_LENGTH; i++) {
    const row = startRow + dir.row * i;
    const col = startCol + dir.col * i;
    const key = `${row}_${col}` as NormalKey;
    const cell = board[key] ?? 0;

    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return [];
    }

    if (cell !== player) {
      return [];
    }

    winningCells.push({ row, col });
  }

  return winningCells;
}

/**
 * Identifies winning combinations from the last played position.
 * Checks each possible winning direction by moving backwards from the last move,
 * examining all potential starting positions that could form a winning sequence.
 * Implements boundary validation before initiating directional checks to optimize performance.
 *
 * @param board - Normalized game state with cell positions as keys
 * @param lastRow - Row position of the last move
 * @param lastCol - Column position of the last move
 * @param player - Numeric identifier of the player who made the last move
 * @param rows - Total number of rows in the game board
 * @param cols - Total number of columns in the game board
 * @returns Array of positions forming the winning sequence, empty if no win found
 */
export function checkWin(
  board: NormalizedGameState,
  lastRow: number,
  lastCol: number,
  player: number,
  rows: number,
  cols: number,
): Position[] {
  for (const direction of Object.keys(DIRECTIONS) as WinningDirection[]) {
    for (let i = 0; i < WINNING_LENGTH; i++) {
      const dir = DIRECTIONS[direction];
      const startRow = lastRow - dir.row * i;
      const startCol = lastCol - dir.col * i;

      if (
        startRow < 0 ||
        startRow + dir.row * (WINNING_LENGTH - 1) >= rows ||
        startCol < 0 ||
        startCol + dir.col * (WINNING_LENGTH - 1) >= cols
      ) {
        continue;
      }

      const winningCells = checkWinInDirection(
        board,
        startRow,
        startCol,
        player,
        direction,
        rows,
        cols,
      );
      if (winningCells?.length) {
        return winningCells;
      }
    }
  }

  return [];
}

/**
 * Determines if the game board has no empty cells remaining.
 * Validates board existence and type before checking cell values.
 * Uses object values lookup to detect presence of empty cells.
 *
 * @param game - Game object containing the board state
 * @returns Boolean indicating if board is completely filled
 */
export function isBoardFull({ board }: Game) {
  if (!board || typeof board !== "object") {
    return false;
  }

  return !Object.values(board).includes(EMPTY_CELL_VALUE);
}

/**
 * Creates a normalized game board with empty cells.
 * Generates a map object with row_col string keys for efficient lookups.
 * Initializes all cells with EMPTY_CELL_VALUE for consistent state handling.
 *
 * @param rows - Number of rows to generate in the board
 * @param cols - Number of columns to generate in the board
 * @returns Normalized game state object with empty cells
 */
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
