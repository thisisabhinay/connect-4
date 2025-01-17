"use client";
import { createGameSession } from "@/actions/create-game-session";
import Image from "next/image";
import { Logo } from "@repo/assets/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  async function handleSubmit(formData: FormData) {
    const game = await createGameSession(formData);

    if (game.id) {
      router.push(`/game/${game.id}`);
    }
  }

  return (
    <main
      data-comp="Home"
      className="h-screen grid grid-cols-1 auto-rows-max items-center justify-center"
    >
      <div className="flex items-center justify-center py-10">
        <Image
          src={Logo.src}
          width={Logo.width / 1.5}
          height={Logo.height / 1.5}
          alt="Connect4 logo"
        />
      </div>

      <div className="p-8">
        <div className="max-w-md mx-auto bg-white rounded p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Start New Game
          </h1>

          <form action={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="player1"
                className="block text-sm font-medium mb-1"
              >
                Player 1 Name
              </label>
              <input
                type="text"
                name="player1"
                id="player1"
                required
                className="w-full border rounded p-2"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="player2"
                className="block text-sm font-medium mb-1"
              >
                Player 2 Name
              </label>
              <input
                type="text"
                name="player2"
                id="player2"
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="rows" className="block text-sm font-medium mb-1">
                Rows
              </label>
              <input
                type="number"
                name="rows"
                id="rows"
                required
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="cols" className="block text-sm font-medium mb-1">
                Cols
              </label>
              <input
                type="number"
                name="cols"
                id="cols"
                required
                className="w-full border rounded p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            >
              Start Game
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
