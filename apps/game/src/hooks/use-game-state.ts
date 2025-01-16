import { Game } from "@/types/game";
import { checkWin, isBoardFull } from "@/utils/game";
import { useState, useCallback } from "react";

export type FillColor = {
  [key: number]: string;
};

export type PlayerMap = {
  [key: number]: number;
};

export const NEXT_PLAYER_MAP: PlayerMap = { 1: 2, 2: 1 };
export const PLAYER_COLORS: FillColor = {
  1: "!bg-indigo-500 !border-solid",
  2: "!bg-amber-500 !border-solid",
};

export function useGameState(initialGameState: Game) {
  const [gameState, setGameState] = useState<Game>(initialGameState);

  const isMoveLegal = useCallback(
    (row: number, col: number) => {
      // For bottom row, just check if the space is empty
      if (row === gameState.rows) {
        return gameState.board[`${row}_${col}`] === 0;
      }

      // For other rows, check if space is empty and space below is occupied
      return (
        gameState.board[`${row}_${col}`] === 0 &&
        gameState.board[`${row + 1}_${col}`] > 0
      );
    },
    [gameState.board, gameState.rows],
  );

  const makeMove = useCallback(
    (row: number, col: number) => {
      if (col < 0 || col >= gameState.cols || !isMoveLegal(row, col)) return;

      setGameState((prev) => {
        const newBoard = {
          ...prev.board,
          [`${row}_${col}`]: prev.activePlayer,
        };

        const winningCells = checkWin(newBoard, row, col, prev.activePlayer);
        const isGameOver =
          Boolean(winningCells) ||
          isBoardFull({ board: newBoard, cols: prev.cols } as Game);

        return {
          ...prev,
          board: newBoard,
          lastPlayer: prev.activePlayer,
          activePlayer: isGameOver
            ? prev.activePlayer
            : NEXT_PLAYER_MAP[prev.activePlayer],
          isGameOver,
          winner: winningCells ? prev.activePlayer : 0,
          winningCells: winningCells || [],
        };
      });
    },
    [isMoveLegal, gameState.cols],
  );

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      board: {},
      lastPlayer: 2,
      activePlayer: 1,
      isGameOver: false,
      winner: 0,
      winningCells: [],
    }));
  }, []);

  return {
    ...gameState,
    makeMove,
    isBoardFull,
    isMoveLegal,
    resetGame,
    getPlayerColor: (player: number) => PLAYER_COLORS[player],
  };
}
