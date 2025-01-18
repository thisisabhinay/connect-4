import Link from "next/link";
/**
 * Represents the props structure for displaying game errors, requiring a string
 * message that explains what went wrong during gameplay.
 */
export interface NoGame {
  error: string;
}

/**
 * @param {NoGame} props - Destructured error message from props
 *
 * Renders a full-screen error display with NES.css styling when game initialization
 * or gameplay encounters critical issues. Centers content vertically and horizontally
 * using flex layout.
 *
 * The error message appears in a black container with red text for high contrast
 * visibility. Provides two action buttons:
 * - Exit Game: Returns to home screen through Next.js client navigation
 * - Reload Session: Forces a full page refresh to attempt recovery
 */
export function NoGame({ error }: NoGame) {
  return (
    <div className="text-red-500 text-center flex flex-col gap-4 justify-center items-center">
      <span className="bg-black w-fit p-3">{error}</span>
      <div className="flex items-center gap-4">
        <Link href="/" className="nes-btn is-default">
          Exit Game
        </Link>
        <button
          className="nes-btn is-warning"
          onClick={() => window.location.reload()}
        >
          Reload Session
        </button>
      </div>
    </div>
  );
}
