import { NESCursor } from "@/config/nes-cursor";
import { PlayerName } from "@/types/game";
import { forwardRef, HTMLProps } from "react";
import Image from "next/image";
import { CryingCat } from "@repo/assets/image";
import { PLAYER_ONE, PLAYER_TWO } from "@/const";
import { soundGameDraw, soundGameWin } from "@/config/sound-effects";

interface ModalGameOver extends HTMLProps<HTMLDialogElement> {
  title: string;
  playerNames: PlayerName;
  winner: number;
  isDraw: boolean;
  close: () => void;
  goToStartScreen: () => void;
  resetGame: () => void;
}

const winnerText = {
  [PLAYER_ONE]: "is-primary",
  [PLAYER_TWO]: "is-error",
};

export const ModalGameOver = forwardRef<HTMLDialogElement, ModalGameOver>(
  (
    { title, close, resetGame, goToStartScreen, winner, playerNames, isDraw },
    ref,
  ) => {
    if (isDraw) soundGameDraw.play();
    if (winner) soundGameWin.play();

    return (
      <dialog
        className="nes-dialog border-black w-full lg:w-1/2"
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

          {winner && !isDraw ? (
            <div className="flex items-center justify-center gap-2">
              <i className="nes-icon is-large star" />
              <i className="nes-icon is-large star" />
              <i className="nes-icon is-large star" />
            </div>
          ) : null}

          {isDraw ? (
            <Image
              src={CryingCat.src}
              width={Math.round(CryingCat.width / 1.5)}
              height={Math.round(CryingCat.height / 1.5)}
              alt="Crying cat"
            />
          ) : null}

          {winner === PLAYER_ONE && !isDraw ? (
            <i className="nes-charmander scale-x-[-1]" />
          ) : null}

          {winner === PLAYER_TWO && !isDraw ? (
            <i className="nes-kirby" />
          ) : null}

          {winner && !isDraw ? (
            <p>
              <span className={`nes-text ${winnerText[winner]}`}>
                {playerNames[winner]}&nbsp;
              </span>
              is the winner.
            </p>
          ) : null}

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
