import { NESCursor } from "@/config/nes-cursor";
import { PlayerName } from "@/types/game";
import { forwardRef, HTMLProps } from "react";
import Image from "next/image";
import { CryingCat } from "@repo/assets/image";
import { PLAYER_ONE, PLAYER_TWO } from "@/const";
import { soundGameDraw, soundGameWin } from "@/config/sound-effects";

/**
 * Modal dialog shown when the game ends, displaying the winner or draw state.
 * Controls sound effects, winner animations, and provides game reset/exit options.
 *
 * @param title        - Header text displayed at top of modal
 * @param playerNames  - Object mapping player numbers to their chosen display names
 * @param winner       - ID number of winning player (1 or 2), or 0 if no winner
 * @param isDraw       - Whether game ended in a draw state
 * @param close        - Handler to dismiss the modal
 * @param goToStartScreen - Handler to exit current game and return to player setup
 * @param resetGame    - Handler to clear board state and start a new game
 */
interface ModalGameOver extends HTMLProps<HTMLDialogElement> {
  title: string;
  playerNames: PlayerName;
  winner: number;
  isDraw: boolean;
  close: () => void;
  goToStartScreen: () => void;
  resetGame: () => void;
}

/**
 * Maps player IDs to their corresponding NES theme color classes.
 * Player 1 uses primary (blue) and Player 2 uses error (red) styling.
 */
const winnerText = {
  [PLAYER_ONE]: "text-rose-500",
  [PLAYER_TWO]: "text-amber-500",
};

/**
 * Game over modal with NES.css styling and retro game animations.
 * Automatically triggers victory/draw sound effects when opened.
 * Shows pixelated character sprites and star animations for winners.
 * Displays crying cat sprite for draw games.
 * Includes shareable game URL and options to restart or exit.
 */
export const ModalGameOver = forwardRef<HTMLDialogElement, ModalGameOver>(
  (
    { title, close, resetGame, goToStartScreen, winner, playerNames, isDraw },
    ref,
  ) => {
    /**
     * Triggers appropriate sound effect based on game outcome.
     * Draw state plays a distinct sound from victory.
     */
    if (isDraw) soundGameDraw.play();
    if (winner) soundGameWin.play();

    return (
      <dialog
        className="nes-dialog border-black w-full lg:w-1/2"
        id="dialog-default"
        ref={ref}
      >
        <div className="grid grid-cols-1 auto-rows-max justify-items-center gap-4">
          {/* Title bar with close button using NES cursor styling */}
          <p className="title w-full text-2xl nes-text is-success text-center flex items-center justify-center relative">
            {title}
            <i
              className="nes-icon close is-small absolute right-0"
              style={NESCursor}
              onClick={close}
            />
          </p>

          {/* Victory animation with three stars, shown only for wins */}
          {winner && !isDraw ? (
            <div className="flex items-center justify-center gap-2">
              <i className="nes-icon is-large star" />
              <i className="nes-icon is-large star" />
              <i className="nes-icon is-large star" />
            </div>
          ) : null}

          {/* Draw state displays crying cat sprite scaled down by 1.5x */}
          {isDraw ? (
            <Image
              src={CryingCat.src}
              width={Math.round(CryingCat.width / 1.5)}
              height={Math.round(CryingCat.height / 1.5)}
              alt="Crying cat"
            />
          ) : null}

          {/* Player 1 victory shows mirrored Charmander sprite */}
          {winner === PLAYER_ONE && !isDraw ? (
            <i className="nes-charmander scale-x-[-1]" />
          ) : null}

          {/* Player 2 victory shows Kirby sprite */}
          {winner === PLAYER_TWO && !isDraw ? (
            <i className="nes-kirby" />
          ) : null}

          {/* Winner announcement with player-specific color theming */}
          {winner && !isDraw ? (
            <p>
              <span className={`nes-text ${winnerText[winner]}`}>
                {playerNames[winner]}&nbsp;
              </span>
              is the winner.
            </p>
          ) : null}

          {/* Shareable game URL field */}
          <div className="nes-field w-full my-5">
            <label htmlFor="game-url">Game Link:</label>
            <input
              type="text"
              id="game-url"
              name="game-url"
              className="nes-input"
              defaultValue={window.location.href}
            />
          </div>

          {/* Action buttons for game flow control */}
          <menu className="dialog-menu flex items-center justify-center gap-4">
            <button className="nes-btn" onClick={goToStartScreen}>
              Exit Game
            </button>
            <button
              className="nes-btn is-warning"
              onClick={() => {
                close();
                resetGame();
              }}
            >
              Play Again
            </button>
          </menu>
        </div>
      </dialog>
    );
  },
);

ModalGameOver.displayName = "ModalGameOver";
