import { Game } from "@/types/game";
import { CoinElement } from "./coin";

type FillColor = {
  [key: number]: string;
};

const fillColor: FillColor = {
  1: "bg-indigo-500",
  2: "bg-amber-500",
};

export function GameBoard({ board, lastPlayer }: Game) {
  function getInteractionStatus() {}

  return (
    <div
      data-comp="GameBoard"
      className="p-10 bg-white rounded-xl shadow-sm border border-slate-200"
    >
      {board.map((row, i) => (
        <div key={i} className="flex items-center gap-4 mb-4">
          {row.map((col, j) => (
            <CoinElement key={j} filled={fillColor[board[i][j]]} />
          ))}
        </div>
      ))}
    </div>
  );
}
