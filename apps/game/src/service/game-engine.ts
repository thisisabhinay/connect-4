import { Game } from "@/types/game";

export type NormalKey = `${number}_${number}`;

export interface NormalizedGameState {
  [key: NormalKey]: number;
}

class GameEngine {
  public board: NormalizedGameState;
  public lastPlayer: number;

  private static _instance: GameEngine;

  constructor() {
    this.board = {};
    this.lastPlayer = 0;
  }

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  public updateGameState(game?: Game) {
    const { board, lastPlayer } = game as Game;
    this.board = board ?? {};
    this.lastPlayer = lastPlayer ?? 0;
  }

  public normalizeData(board: number[][]): NormalizedGameState {
    const normalState: NormalizedGameState = {};

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        const keyName: NormalKey = `${i}_${j}`;
        normalState[keyName] = board[i][j];
      }
    }
    return normalState;
  }

  public print() {
    console.log(this);
  }
}

export const gameEngine = GameEngine.getInstance();
