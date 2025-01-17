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
      className="grid grid-cols-1 auto-rows-max items-center justify-center"
    >
      <div className="flex items-center justify-center py-10">
        <Image
          src={Logo.src}
          width={Math.round(Logo.width / 1.5)}
          height={Math.round(Logo.height / 1.5)}
          alt="Connect4 Logo"
        />
      </div>

      <div className="p-8 flex items-center justify-center relative">
        <i className="nes-octocat animate absolute z-0 -top-10" />
        <div className="z-10 max-w-md mx-auto bg-white rounded flex flex-col gap-4 relative nes-container with-title is-rounded">
          <h1 className="nes-text is-primary text-2xl font-bold text-center mb-6">
            New Game Session
          </h1>
          <form action={handleSubmit}>
            <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-4">
              <div className="nes-field">
                <label htmlFor="player1">Player 1</label>
                <input
                  type="text"
                  id="player1"
                  name="player1"
                  className="nes-input"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="nes-field">
                <label htmlFor="player2">Player 2</label>
                <input
                  type="text"
                  id="player2"
                  name="player2"
                  className="nes-input"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="nes-field">
                <label htmlFor="rows">Rows</label>
                <input
                  type="number"
                  id="rows"
                  name="rows"
                  className="nes-input"
                  placeholder="Count"
                  min={4}
                  defaultValue={4}
                  required
                />
              </div>
              <div className="nes-field">
                <label htmlFor="cols">Columns</label>
                <input
                  type="number"
                  id="cols"
                  name="cols"
                  className="nes-input"
                  placeholder="Count"
                  min={4}
                  defaultValue={4}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-center flex-1 mt-6">
              <button type="submit" className="nes-btn is-warning">
                Start Game
              </button>
            </div>
          </form>

          <section className="flex items-center justify-center gap-4 py-6">
            <a
              href="https://x.com/thisisabhinay"
              target="_blank"
              className="nes-icon twitter is-large"
            ></a>
            <a
              href="#"
              target="_blank"
              className="nes-icon linkedin is-large"
            ></a>
          </section>
        </div>
      </div>
    </main>
  );
}
