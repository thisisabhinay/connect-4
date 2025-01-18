import { Coin } from "@/enum";
import { PlayerStyleMap } from "@/types/style";
import clsx from "clsx";

/**
 * Represents the core structural interface for a Connect Four game slot.
 * Tracks position, player ownership, game state, and click handlers.
 */
export interface CoinSlot {
  filled?: string;
  i: number;
  j: number;
  player: number;
  handlePlayerMove: (x: number, y: number) => void;
  isAllowed: boolean;
  isWinningCell: boolean;
  isGameOver: boolean;
  value: number;
}

/**
 * Renders an individual slot in the Connect Four grid. Manages the visual state
 * including hover effects, winning combinations, and game-over states.
 *
 * @param filled - CSS classes for the coin's appearance when occupied
 * @param isAllowed - Controls if a move can be made in this slot
 * @param handlePlayerMove - Callback triggered when a valid move is made
 * @param isWinningCell - Flags if this slot is part of the winning combination
 * @param value - Numeric identifier for the player who owns this slot
 * @param isGameOver - Controls end-game visual states and click behaviors
 * @param i - Vertical position in the grid (row)
 * @param j - Horizontal position in the grid (column)
 */
export function CoinSlot({
  filled = "",
  isAllowed,
  handlePlayerMove,
  isWinningCell,
  value,
  isGameOver,
  i,
  j,
}: CoinSlot) {
  /**
   * Maps player numbers to their respective winning slot styles.
   * Player 1 uses rose color scheme, Player 2 uses amber.
   */
  const slotRing: PlayerStyleMap = {
    1: "ring-[6px] ring-rose-200",
    2: "ring-[6px] ring-amber-200",
  };

  /**
   * Processes click events on slots. Prevents moves after game completion
   * and delegates to the main game handler for valid moves.
   */
  function initPlayerMove(i: number, j: number) {
    if (isGameOver) return;
    handlePlayerMove(i, j);
  }

  return (
    <div
      data-winning={isWinningCell}
      data-allowed={isAllowed}
      onClick={() => initPlayerMove(i, j)}
      className={clsx(
        Coin.Size,
        filled,
        isAllowed
          ? "cursor-pointer transform hover:scale-110 hover:border-black"
          : "cursor-not-allowed bg-blue-400 border-none",
        "cursor-pointer border-[6px] rounded-full !border-black",
        "transition-all duration-200 ease-out",
        "flex-shrink-0",
        isWinningCell ? slotRing[value] : "",
        isWinningCell
          ? isGameOver
            ? "!cursor-not-allowed opacity-100"
            : ""
          : isGameOver
            ? "!cursor-not-allowed opacity-40"
            : "",
      )}
    />
  );
}
