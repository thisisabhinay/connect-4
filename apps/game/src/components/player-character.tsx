import { PlayerStyleMap } from "@/types/style";

/**
 * Defines the structure for player character attributes in the game.
 * Tracks the player's win state, display name, unique ID, speech balloon visibility,
 * and whether the game has concluded.
 */
export interface PlayerCharacter {
  isWinner: boolean;
  playerName: string;
  playerId: number;
  showBalloon: boolean;
  gameOver: boolean;
}

/**
 * Maps player IDs to their corresponding sprite class names.
 * Player 1 uses a horizontally flipped Charmander sprite while
 * Player 2 uses a standard Kirby sprite.
 */
const characterMap: PlayerStyleMap = {
  1: "nes-charmander scale-x-[-1]",
  2: "nes-kirby",
};

/**
 * Defines speech balloon positioning for each player.
 * Player 1's balloon appears from the right side while
 * Player 2's balloon appears from the left, both offset by 28 units
 * from their respective edges.
 */
const balloonDir: PlayerStyleMap = {
  1: "from-right -top-28 -left-28",
  2: "from-left -top-28 -right-28",
};

/**
 * Maps player ID numbers to their corresponding style classes for visual indicators.
 * Each number key represents a unique player, with associated CSS classes that define
 * their display style (typically for status or state indication).
 */
const playerBage: PlayerStyleMap = {
  1: "is-error",
  2: "is-warning",
};

/**
 * Renders a player character with their associated sprite, name badge, and
 * conditional speech balloon. The sprite animates with a bounce effect when
 * the player wins. Speech balloons only display during active gameplay
 * when it's the player's turn.
 *
 * @param isWinner Controls victory bounce animation
 * @param playerName Displayed on the badge below the sprite
 * @param playerId Determines sprite selection and balloon positioning
 * @param showBalloon Controls speech balloon visibility
 * @param gameOver Prevents balloon display when game concludes
 */
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
            <span className={playerBage[playerId]}>
              P{playerId}: {playerName}
            </span>
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
