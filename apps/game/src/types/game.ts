export type Position = {
  row: number;
  col: number;
};

export type WinningDirection =
  | "horizontal"
  | "vertical"
  | "diagonal"
  | "antiDiagonal";

export type NormalKey = `${number}_${number}`;

export interface NormalizedGameState {
  [key: NormalKey]: number;
}

export interface Game {
  board: NormalizedGameState;
  lastPlayer: number;
  activePlayer: number;
  rows: number;
  cols: number;
  isGameOver: boolean;
  winner: number;
  winningCells: Position[];
}

export interface GameResource extends Game {
  id: string;
  lastUpdate: string;
}
