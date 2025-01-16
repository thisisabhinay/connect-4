import { Game, NormalKey } from "@/types/game";
import { CoinElement } from "./coin";

type FillColor = {
  [key: number]: string;
};

const fillColor: FillColor = {
  1: "bg-indigo-500",
  2: "bg-amber-500",
};

export function GameBoard({ board, rows, cols }: Game) {
  return (
    <div
      data-comp="GameBoard"
      className="p-10 bg-white rounded-xl shadow-sm border border-slate-200"
    >
      {Array(rows)
        .fill(0)
        ?.map((row, i) => (
          <div key={i} className="flex items-center gap-4 mb-4">
            {Array(cols)
              .fill(0)
              ?.map((col, j) => {
                return (
                  <CoinElement
                    key={j}
                    x={i}
                    y={j}
                    filled={fillColor[board[`${i}_${j}` as NormalKey]]}
                  />
                );
              })}
          </div>
        ))}
    </div>
  );
}
