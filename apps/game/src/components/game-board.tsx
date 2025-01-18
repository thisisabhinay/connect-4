"use client";

import { GameResource, NormalKey } from "@/types/game";
import { CoinElement } from "./coin";
import { useGameState } from "@/hooks/use-game-state";
import { useEffect, useRef } from "react";
import { goToStartScreen } from "@/actions/goto-start-screen";
import { ModalGameOver } from "./modal-game-over";

export interface GameBoardProps extends GameResource {
  onPlayerUpdateAction: (
    activePlayer: number,
    winner: number,
    isGameOver: boolean,
  ) => void;
}

export function GameBoard({
  onPlayerUpdateAction,
  ...initalGameState
}: GameBoardProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const {
    board: gameBoard,
    activePlayer,
    isMoveLegal,
    makeMove,
    isGameOver,
    winner,
    getPlayerColor,
    playerNames,
    resetGame,
    winningCells,
  } = useGameState(initalGameState);

  const winningIndexes = winningCells.map((cell) => `${cell.row}_${cell.col}`);

  const isDraw = isGameOver && winner === 0;

  function openDialog() {
    const modal = modalRef.current as HTMLDialogElement;
    modal?.showModal();
  }

  function closeDialog() {
    const modal = modalRef.current as HTMLDialogElement;
    modal?.close();
  }

  if (isGameOver) openDialog();

  useEffect(() => {
    onPlayerUpdateAction(activePlayer, winner, isGameOver);
  }, [activePlayer, isGameOver, onPlayerUpdateAction, winner]);

  return (
    <div
      data-comp="GameBoard"
      className="mx-auto h-full w-auto max-w-screen-lg max-h-[75svh] overflow-auto p-10 bg-white rounded-xl shadow-sm border border-slate-200 nes-container is-rounded"
    >
      <div className="grid grid-cols-1 auto-rows-max gap-10">
        <div
          id="game-stats"
          className={`mb-4 text-center ${isGameOver ? "block" : "hidden"}`}
        >
          {isGameOver ? (
            <button
              type="button"
              className="nes-btn is-default"
              onClick={openDialog}
            >
              Game Status
            </button>
          ) : null}
          <ModalGameOver
            ref={modalRef}
            winner={winner}
            title={
              winner && !isDraw ? `Player ${winner} wins!` : "It's a draw!"
            }
            close={closeDialog}
            isDraw={isDraw}
            resetGame={resetGame}
            goToStartScreen={goToStartScreen}
            playerNames={playerNames}
          />
        </div>
        <div id="board-grid">
          {Array(initalGameState.rows)
            .fill(0)
            ?.map((row, i) => (
              <div
                key={i}
                className="flex flex-shrink-0 items-center gap-4 mb-4 last:mb-0"
              >
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
