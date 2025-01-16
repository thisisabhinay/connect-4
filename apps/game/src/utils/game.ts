import {
  Game,
  NormalizedGameState,
  Position,
  WinningDirection,
} from "@/types/game";

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
): Position[] {
  const winningCells: Position[] = [];
  const dir = DIRECTIONS[direction];

  // Check WINNING_LENGTH positions in the given direction
  for (let i = 0; i < WINNING_LENGTH; i++) {
    const row = startRow + dir.row * i;
    const col = startCol + dir.col * i;
    const cell = board[`${row}_${col}`];

    // If we find a cell that's not the player's, this isn't a winning line
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
        startRow + dir.row * (WINNING_LENGTH - 1) >= lastRow ||
        startCol < 0 ||
        startCol + dir.col * (WINNING_LENGTH - 1) >= lastCol
      ) {
        continue;
      }

      const winningCells = checkWinInDirection(
        board,
        startRow,
        startCol,
        player,
        direction,
      );
      if (winningCells) {
        return winningCells;
      }
    }
  }

  return [];
}

export function isBoardFull({ board, cols }: Game) {
  for (let col = 0; col < cols; col++) {
    if (board[`0_${col}`] === 0) {
      return false;
    }
  }
  return true;
}
