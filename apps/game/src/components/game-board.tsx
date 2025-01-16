import { Game, NormalKey } from "@/types/game";
import { CoinElement } from "./coin";
import { useEffect, useState } from "react";

type FillColor = {
  [key: number]: string;
};

const fillColor: FillColor = {
  1: "!bg-indigo-500 !border-solid",
  2: "!bg-amber-500 !border-solid",
};

const nextPlayerMap: {
  [key: number]: number;
} = { 1: 2, 2: 1 };

export function GameBoard({ board, rows, cols, lastPlayer }: Game) {
  const [boardState, setBoardState] = useState(board);
  const [activePlayer, setActivePlayer] = useState<number>();

  function getAllowedStatus(row: number, col: number) {
    return (
      (boardState[`${row + 1}_${col}`] > 0 &&
        boardState[`${row}_${col}`] === 0) ||
      row === rows
    );
  }

  function handlePlayerMove(row: number, col: number) {
    setBoardState((prev) => {
      if (!row || !col) return prev;

      prev[`${row}_${col}`] = activePlayer as number;

      console.log(prev);
      return prev;
    });

    setActivePlayer(nextPlayerMap[activePlayer as number]);
  }

  useEffect(() => {
    setBoardState(board);
    setActivePlayer(nextPlayerMap[lastPlayer]);

    console.log(board);
  }, [lastPlayer, board]);

  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <div
      data-comp="GameBoard"
      className="p-10 bg-white rounded-xl shadow-sm border border-slate-200"
    >
      <div className="grid grid-cols-1 auto-rows-max gap-10">
        <div id="player-info">
          <h2 className="text-2xl font-semibold uppercase">
            Player {activePlayer} turn
          </h2>
        </div>
        <div id="board-grid">
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
                        isAllowed={getAllowedStatus(i, j)}
                        filled={fillColor[boardState[`${i}_${j}` as NormalKey]]}
                        player={activePlayer as number}
                        handlePlayerMove={handlePlayerMove}
                      />
                    );
                  })}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
