import { Coin } from "@/enum";
import clsx from "clsx";

export interface CoinElement {
  filled?: string;
  isInteractable?: boolean;
  x: number;
  y: number;
}

export function CoinElement({
  filled = "",
  isInteractable = true,
  x,
  y,
}: CoinElement) {
  return (
    <div
      data-x={x}
      data-y={y}
      className={clsx(
        Coin.Size,
        filled,
        isInteractable
          ? "cursor-pointer transform hover:scale-110 hover:border-slate-800"
          : "cursor-not-allowed",
        "cursor-pointer border-2 rounded-full border-slate-800/40",
        "transition-all duration-200 ease-out",
      )}
    />
  );
}
