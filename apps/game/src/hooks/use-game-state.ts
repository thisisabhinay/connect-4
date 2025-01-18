import { Game, GameResource, NormalKey, PlayerMap } from "@/types/game";
import { checkWin, generateEmptyBoard, isBoardFull } from "@/utils/game";
import { useState, useCallback, useEffect } from "react";
import { updateGameSession } from "@/actions/update-game-session";
import { PLAYER_ONE, PLAYER_TWO } from "@/const";
import { soundPlayer1, soundPlayer2 } from "@/config/sound-effects";
import { PlayerStyleMap } from "@/types/style";

/**
 * Maps current player to next player in sequence. When player 1 moves,
 * switches to player 2 and vice versa.
 */
export const NEXT_PLAYER_MAP: PlayerMap = { 1: 2, 2: 1 };

/**
 * Defines Tailwind CSS classes for player piece styling.
 * Player 1 uses rose-500 background, Player 2 uses amber-500 background.
 * Both use solid borders to distinguish from empty cells.
 */
export const PLAYER_COLORS: PlayerStyleMap = {
  1: "!bg-rose-500 !border-solid",
  2: "!bg-amber-500 !border-solid",
};

/**
 * Custom hook managing the core Connect Four game logic including board state,
 * move validation, win detection, and game reset functionality.
 *
 * @param initialGameState Initial configuration including board dimensions and starting player
 */
export function useGameState(initialGameState: GameResource) {
  const [gameState, setGameState] = useState<GameResource>(initialGameState);

  /**
   * Retrieves the value at specified board coordinates.
   * Uses string concatenation for board key lookup with nullish coalescing
   * to handle edge cases where cell doesn't exist in board map.
   */
  const getCellValue = useCallback(
    (row: number, col: number): number => {
      const key = `${row}_${col}`;
      return gameState.board[key as NormalKey] ?? 0;
    },
    [gameState.board],
  );

  /**
   * Validates if a move is legal based on Connect Four rules:
   * - Bottom row pieces can be placed in any empty cell
   * - Other rows require the cell below to be occupied (pieces stack upward)
   */
  const isMoveLegal = useCallback(
    (row: number, col: number) => {
      if (row === gameState.rows - 1) {
        return getCellValue(row, col) === 0;
      }
      return getCellValue(row, col) === 0 && getCellValue(row + 1, col) > 0;
    },
    [gameState.rows, getCellValue],
  );

  /**
   * Processes a player's move, updating board state and checking win conditions.
   * Handles:
   * - Move validation
   * - Board state updates
   * - Win detection using connected pieces
   * - Player turn switching
   * - Sound effect triggering
   * - Game over state management
   */
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

        const activePlayer = isGameOver
          ? prev.activePlayer
          : NEXT_PLAYER_MAP[prev.activePlayer];

        if (activePlayer === PLAYER_ONE) soundPlayer1.play();
        if (activePlayer === PLAYER_TWO) soundPlayer2.play();

        return {
          ...prev,
          lastUpdate: new Date().toISOString(),
          board: newBoard,
          lastPlayer: prev.activePlayer,
          activePlayer: activePlayer,
          isGameOver,
          winner: winningCells.length
            ? isGameOver
              ? prev.activePlayer
              : 0
            : 0,
          winningCells: winningCells || [],
        };
      });
    },
    [gameState.cols, isMoveLegal, initialGameState.rows, initialGameState.cols],
  );

  /**
   * Resets game to initial state while preserving board dimensions.
   * Clears board, resets players (starting with Player 1), and clears win state.
   */
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

  /**
   * Persists game state changes to backend storage after each move
   */
  useEffect(() => {
    updateGameSession(gameState);
  }, [gameState]);

  return {
    ...gameState,
    makeMove,
    isBoardFull,
    isMoveLegal,
    resetGame,
    getPlayerColor: (player: number) => PLAYER_COLORS[player],
  };
}
