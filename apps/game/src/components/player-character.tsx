import { PlayerStyleMap } from "@/types/style";

export interface PlayerCharacter {
  isWinner: boolean;
  playerName: string;
  playerId: number;
  showBalloon: boolean;
  gameOver: boolean;
}

const characterMap: PlayerStyleMap = {
  1: "nes-charmander scale-x-[-1]",
  2: "nes-kirby",
};

const balloonDir: PlayerStyleMap = {
  1: "from-right -top-28 -left-28",
  2: "from-left -top-28 -right-28",
};

export function PlayerCharacter({
  isWinner,
  playerName,
  playerId,
  showBalloon,
  gameOver,
}: PlayerCharacter) {
  return (
    <section className="message-list relative self-center justify-self-end">
      <section className="message -left">
        <div className="flex flex-col gap-2 items-center">
          <i
            className={`animate ${characterMap[playerId]}  ${isWinner ? "animate-bounce" : ""}`}
          />
          <i className="nes-badge">
            <span className="is-primary">P1: {playerName}</span>
          </i>
        </div>
        {showBalloon && !gameOver ? (
          <div className={`nes-balloon absolute ${balloonDir[playerId]}`}>
            <p>My turn</p>
          </div>
        ) : null}
      </section>
    </section>
  );
}
