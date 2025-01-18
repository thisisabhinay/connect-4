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
export type PlayerName = { [key: number]: string };
export type PlayerMap = { [key: number]: number };

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
  playerNames: PlayerName;
}

export interface GameResource extends Game {
  id: string;
  lastUpdate: string;
}
