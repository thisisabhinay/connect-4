import { Game, NormalKey } from "@/types/game";
import { CoinElement } from "./coin";
import { useGameState } from "@/hooks/use-game-state";

export function GameBoard(initalGameState: Game) {
  const {
    board: gameBoard,
    activePlayer,
    isMoveLegal,
    makeMove,
    getPlayerColor,
  } = useGameState(initalGameState);

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
          {Array(initalGameState.rows)
            .fill(0)
            ?.map((row, i) => (
              <div key={i} className="flex items-center gap-4 mb-4">
                {Array(initalGameState.cols)
                  .fill(0)
                  ?.map((col, j) => {
                    return (
                      <CoinElement
                        key={j}
                        x={i}
                        y={j}
                        isAllowed={isMoveLegal(i, j)}
                        filled={getPlayerColor(
                          gameBoard[`${i}_${j}` as NormalKey],
                        )}
                        player={activePlayer as number}
                        handlePlayerMove={makeMove}
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
