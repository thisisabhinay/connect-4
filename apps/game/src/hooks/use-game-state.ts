import { Game, NormalizedGameState } from "@/types/game";
import { useState, useCallback } from "react";

export type FillColor = {
  [key: number]: string;
};

export type PlayerMap = {
  [key: number]: number;
};

const NEXT_PLAYER_MAP: PlayerMap = { 1: 2, 2: 1 };
const PLAYER_COLORS: FillColor = {
  1: "!bg-indigo-500 !border-solid",
  2: "!bg-amber-500 !border-solid",
};

export function useGameState({ board: initialBoard, lastPlayer, rows }: Game) {
  const [board, setBoard] = useState<NormalizedGameState>(initialBoard);
  const [activePlayer, setActivePlayer] = useState<number>(
    NEXT_PLAYER_MAP[lastPlayer],
  );

  const isMoveLegal = useCallback(
    (row: number, col: number) => {
      return (
        (board[`${row + 1}_${col}`] > 0 && board[`${row}_${col}`] === 0) ||
        row === rows
      );
    },
    [board, rows],
  );

  const makeMove = useCallback(
    (row: number, col: number) => {
      if (!row || !col || !isMoveLegal(row, col)) return;

      setBoard((prev) => ({
        ...prev,
        [`${row}_${col}`]: activePlayer as number,
      }));

      setActivePlayer(NEXT_PLAYER_MAP[activePlayer]);
    },
    [activePlayer, isMoveLegal],
  );

  return {
    board,
    activePlayer,
    isMoveLegal,
    makeMove,
    getPlayerColor: (player: number) => PLAYER_COLORS[player],
  };
}
