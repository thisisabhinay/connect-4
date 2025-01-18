import Link from "next/link";

export interface NoGame {
  error: string;
}

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
