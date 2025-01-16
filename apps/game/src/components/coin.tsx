import { Coin } from "@/enum";
import clsx from "clsx";

export interface CoinElement {
  filled?: string;
  x: number;
  y: number;
  player: number;
  handlePlayerMove: (x: number, y: number) => void;
  isAllowed: boolean;
}

export function CoinElement({
  filled = "",
  isAllowed,
  handlePlayerMove,
  x,
  y,
}: CoinElement) {
  return (
    <div
      data-x={x}
      data-y={y}
      data-allowed={isAllowed}
      onClick={() => handlePlayerMove(x, y)}
      className={clsx(
        Coin.Size,
        filled,
        isAllowed
          ? "cursor-pointer transform hover:scale-110 hover:border-slate-800"
          : "cursor-not-allowed bg-slate-50 border-dotted",
        "cursor-pointer border-8 rounded-full !border-slate-800/20",
        "transition-all duration-200 ease-out",
      )}
    />
  );
}
