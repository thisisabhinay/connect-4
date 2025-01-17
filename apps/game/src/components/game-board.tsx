import { Game, NormalKey } from "@/types/game";
import { CoinElement } from "./coin";
import { useGameState } from "@/hooks/use-game-state";

export function GameBoard(initalGameState: Game) {
  const {
    board: gameBoard,
    activePlayer,
    isMoveLegal,
    makeMove,
    isGameOver,
    winner,
    getPlayerColor,
    resetGame,
    winningCells,
  } = useGameState(initalGameState);

  const winningIndexes = winningCells.map((cell) => `${cell.row}_${cell.col}`);
  console.log(winningIndexes);

  return (
    <div
      data-comp="GameBoard"
      className="mx-auto max-w-fit p-10 bg-white rounded-xl shadow-sm border border-slate-200"
    >
      <div className="grid grid-cols-1 auto-rows-max gap-10">
        <div id="game-stats" className="mb-4">
          {isGameOver ? (
            <div className="text-xl">
              {winner ? `Player ${winner} wins!` : "It's a draw!"}
              <button
                onClick={resetGame}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="text-2xl font-semibold uppercase">
              Player {activePlayer} turn
            </div>
          )}
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
                        i={i}
                        j={j}
                        value={gameBoard[`${i}_${j}` as NormalKey]}
                        isGameOver={isGameOver}
                        isAllowed={isMoveLegal(i, j)}
                        isWinningCell={winningIndexes.includes(`${i}_${j}`)}
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
