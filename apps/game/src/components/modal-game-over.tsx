import { NESCursor } from "@/config/nes-cursor";
import { PlayerName } from "@/types/game";
import { forwardRef, HTMLProps } from "react";

interface ModalGameOverProps extends HTMLProps<HTMLDialogElement> {
  title: string;
  playerNames: PlayerName;
  winner: number;
  close: () => void;
  goToStartScreen: () => void;
  resetGame: () => void;
}

export const ModalGameOver = forwardRef<HTMLDialogElement, ModalGameOverProps>(
  ({ title, close, resetGame, goToStartScreen, winner, playerNames }, ref) => {
    return (
      <dialog
        className="nes-dialog border-black w-1/2"
        id="dialog-default"
        ref={ref}
      >
        <div className="grid grid-cols-1 auto-rows-max justify-items-center gap-4">
          <p className="title w-full text-2xl nes-text is-success text-center flex items-center justify-center relative">
            {title}
            <i
              className="nes-icon close is-small absolute right-0"
              style={NESCursor}
              onClick={close}
            />
          </p>
          <div className="flex items-center justify-center gap-2">
            <i className="nes-icon is-large star" />
            <i className="nes-icon is-large star" />
            <i className="nes-icon is-large star" />
          </div>
          {winner === 1 ? <i className="nes-charmander scale-x-[-1]" /> : null}
          {winner === 2 ? <i className="nes-kirby" /> : null}

          <p>
            <span
              className={`nes-text is-${winner === 1 ? "primary" : "error"}`}
            >
              {playerNames[winner]}&nbsp;
            </span>
            is the winner.
          </p>
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
