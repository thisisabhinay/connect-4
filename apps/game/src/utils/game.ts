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

    // Add bounds checking to prevent out-of-bounds access
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

export function checkWin(
  board: NormalizedGameState,
  lastRow: number,
  lastCol: number,
  player: number,
  rows: number,
  cols: number,
): Position[] {
  // Check all possible winning directions from the last move
  for (const direction of Object.keys(DIRECTIONS) as WinningDirection[]) {
    // We need to check multiple starting positions for each direction
    for (let i = 0; i < WINNING_LENGTH; i++) {
      const dir = DIRECTIONS[direction];
      // Calculate the starting position by moving backwards
      const startRow = lastRow - dir.row * i;
      const startCol = lastCol - dir.col * i;

      // Skip if starting position would lead to out-of-bounds checks
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

export function isBoardFull({ board }: Game) {
  if (!board || typeof board !== "object") {
    return false;
  }

  return !Object.values(board).includes(EMPTY_CELL_VALUE);
}

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
