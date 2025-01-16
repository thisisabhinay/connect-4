export interface Game {
  board: number[][];
  lastPlayer: number;
}

export interface GameResource extends Game {
  id: string;
  lastUpdate: string;
}
