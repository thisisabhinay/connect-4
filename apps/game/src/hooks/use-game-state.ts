import { Game, NormalKey } from "@/types/game";
import { checkWin, generateEmptyBoard, isBoardFull } from "@/utils/game";
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

  const getCellValue = useCallback(
    (row: number, col: number): number => {
      const key = `${row}_${col}`;
      // Use nullish coalescing to default to 0 if the cell doesn't exist
      return gameState.board[key as NormalKey] ?? 0;
    },
    [gameState.board],
  );

  const isMoveLegal = useCallback(
    (row: number, col: number) => {
      // For bottom row, just check if the space is empty
      if (row === gameState.rows - 1) {
        return getCellValue(row, col) === 0;
      }

      // For other rows, check if space is empty and space below is occupied
      return getCellValue(row, col) === 0 && getCellValue(row + 1, col) > 0;
    },
    [gameState.rows, getCellValue],
  );

  const makeMove = useCallback(
    (row: number, col: number) => {
      if (col < 0 || col >= gameState.cols || !isMoveLegal(row, col)) return;

      setGameState((prev) => {
        const newBoard = {
          ...prev.board,
          [`${row}_${col}`]: prev.activePlayer,
        };

        const winningCells = checkWin(
          newBoard,
          row,
          col,
          prev.activePlayer,
          initialGameState.rows,
          initialGameState.cols,
        );

        const isGameOver =
          Boolean(winningCells.length) ||
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
    [gameState.cols, isMoveLegal, initialGameState.rows, initialGameState.cols],
  );

  const resetGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      board: generateEmptyBoard(prev.rows, prev.cols),
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
