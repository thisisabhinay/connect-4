export type NormalKey = `${number}_${number}`;

export interface NormalizedGameState {
  [key: NormalKey]: number;
}

export interface Game {
  board: NormalizedGameState;
  lastPlayer: number;
  rows: number;
  cols: number;
}

export interface GameResource extends Game {
  id: string;
  lastUpdate: string;
}
