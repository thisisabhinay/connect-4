import { Coin } from "@/enum";
import { PlayerStyleMap } from "@/types/style";
import clsx from "clsx";

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
  const slotRing: PlayerStyleMap = {
    1: "ring-[6px] ring-rose-200",
    2: "ring-[6px] ring-amber-200",
  };

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
