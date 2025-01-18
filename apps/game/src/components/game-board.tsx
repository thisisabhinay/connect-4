"use client";

import { GameResource, NormalKey } from "@/types/game";
import { CoinSlot } from "./coin-slot";
import { useGameState } from "@/hooks/use-game-state";
import { useEffect, useRef } from "react";
import { goToStartScreen } from "@/actions/goto-start-screen";
import { ModalGameOver } from "./modal-game-over";

/**
 * Public interface representing the core game board contract, extending base game configuration.
 * Requires implementation of player state notification system through onPlayerUpdateAction.
 *
 * The callback receives 3 critical game state parameters:
 * - activePlayer: Current turn's player number (1 or 2)
 * - winner: Victor's player number, 0 indicates draw state
 * - isGameOver: Terminal state flag indicating no more valid moves
 *
 * This interface ensures parent components can track game progression and
 * orchestrate UI updates based on player actions and game completion states.
 */
export interface GameBoard extends GameResource {
  onPlayerUpdateAction: (
    activePlayer: number,
    winner: number,
    isGameOver: boolean,
  ) => void;
}

/**
 * Board game component implementing Connect Four game logic with win detection
 * and modal display for game completion states. Maintains game progression
 * through player turns and validates move legality.
 *
 * @param onPlayerUpdateAction Callback fired after each player action with updated game state
 * @param initalGameState Contains rows, cols, and other game configuration from parent
 */
export function GameBoard({
  onPlayerUpdateAction,
  ...initalGameState
}: GameBoard) {
  /**
   * Stores reference to game completion modal for programmatic show/hide.
   * Modal displays win/draw state and provides game reset options.
   */
  const modalRef = useRef<HTMLDialogElement>(null);

  /**
   * Processes legal moves by updating board state and checking win conditions.
   * Winning cells are tracked for highlighting the connected pieces.
   * Player colors are managed through getPlayerColor mapping.
   */
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

  /**
   * Transforms winning cell coordinates into string keys matching board state format.
   * Used to highlight connected pieces that caused game victory.
   */
  const winningIndexes = winningCells.map((cell) => `${cell.row}_${cell.col}`);

  /**
   * Game ends in draw when no winner exists but no legal moves remain.
   * Controls modal content and restart options display.
   */
  const isDraw = isGameOver && winner === 0;

  /**
   * Modal control functions using native HTML dialog element.
   * Automatically triggered when game reaches terminal state.
   */
  function openDialog() {
    const modal = modalRef.current as HTMLDialogElement;
    modal?.showModal();
  }

  function closeDialog() {
    const modal = modalRef.current as HTMLDialogElement;
    modal?.close();
  }

  if (isGameOver) openDialog();

  /**
   * Notifies parent component of game state changes after player actions.
   * Enables external components to react to game progression.
   */
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
                      <CoinSlot
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
