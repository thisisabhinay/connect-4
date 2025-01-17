import { Coin } from "@/enum";
import clsx from "clsx";

export interface CoinElement {
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

export function CoinElement({
  filled = "",
  isAllowed,
  handlePlayerMove,
  isWinningCell,
  player,
  value,
  isGameOver,
  i,
  j,
}: CoinElement) {
  const slotShadow: { [key: number]: string } = {
    0: "",
    1: "shadow-blue-500 ",
    2: "shadow-amber-500",
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
          ? "cursor-pointer transform hover:scale-110 hover:border-slate-800"
          : "cursor-not-allowed bg-slate-50 border-dotted",
        slotShadow[value],
        isWinningCell ? "shadow-xl" : "shadow-md",
        "cursor-pointer border-8 rounded-full !border-slate-800/20",
        "transition-all duration-200 ease-out",
        isWinningCell
          ? isGameOver
            ? "!cursor-not-allowed opacity-100"
            : ""
          : isGameOver
            ? "!cursor-not-allowed opacity-60"
            : "",
      )}
    />
  );
}
