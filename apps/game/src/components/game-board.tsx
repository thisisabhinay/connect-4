import { GameResource } from "@/types/game";
import clsx from "clsx";

export interface GameBoard {
  game: GameResource | undefined;
}

const COIN_SIZE = "size-20";

export function GameBoard({ game }: GameBoard) {
  console.log(game);
  return (
    <div data-comp="GameBoard" className="p-10">
      {game?.board.map((row, i) => (
        <div key={i} className="flex items-center gap-4 mb-4">
          {row.map((col, j) => (
            <div
              key={j}
              className={clsx(
                COIN_SIZE,
                "border-2 rounded-full border-slate-800",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
