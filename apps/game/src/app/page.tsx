"use client";
import { createGameSession } from "@/actions/create-game-session";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { getLastGame, persistLastGame } from "@/utils/persistence";
import { useEffect, useState } from "react";

/**
 * Home page component that handles game session creation and persistence
 * Implements a form for collecting player names and board dimensions
 * Provides functionality to resume the last played game session
 */
export default function Home() {
  const router = useRouter();

  /**
   * Manages the URL of the last played game session
   * Initial value is retrieved from persistent storage via getLastGame()
   */
  const [lastGame, setLastGame] = useState(getLastGame());

  /**
   * Processes form submission to create a new game session
   * Creates game with provided player names and board dimensions
   * Redirects to the game page on successful creation
   * Updates lastGame state with the new game URL
   */
  async function handleSubmit(formData: FormData) {
    const game = await createGameSession(formData);

    if (game.id) {
      const url = `/game/${game.id}`;
      setLastGame(url);
      router.push(url);
    }
  }

  /**
   * Persists lastGame URL whenever it changes
   * Enables game session resumption across page reloads
   */
  useEffect(() => {
    persistLastGame(lastGame);
  }, [lastGame]);

  useEffect(() => {
    persistLastGame(getLastGame());
  }, []);

  return (
    <main
      data-comp="Home"
      className="grid grid-cols-1 auto-rows-max items-center justify-center bg-fixed bg-black bg-sky animate-bg bg-cover"
    >
      <Header />

      <div className="p-8 flex items-center justify-center relative">
        {/* Animated octokat icon positioned above the form container */}
        <i className="nes-octocat animate duration-500 absolute z-0 -top-10 hover:top-[-1rem]" />

        {/* NES-styled form container with higher z-index to appear above the octokat */}
        <div className="z-10 max-w-md mx-auto bg-white rounded flex flex-col gap-4 relative nes-container with-title is-rounded">
          <h1 className="nes-text is-primary text-2xl font-bold text-center mb-6">
            New Game Session
          </h1>

          {/* Game configuration form with grid layout that adapts from 1 to 2 columns on md breakpoint */}
          <form action={handleSubmit}>
            <div className="grid grid-cols-1 grid-rows-4 md:grid-cols-2 md:grid-rows-2 gap-4">
              {/* Player name inputs with NES styling */}
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

              {/* Board dimension inputs with minimum size constraint of 4x4 */}
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

            {/* Action buttons container with conditional rendering of resume button */}
            <div className="flex flex-col items-center justify-center flex-1 mt-6 gap-4">
              <button type="submit" className="nes-btn is-warning">
                Start New Game
              </button>
              {lastGame ? (
                <button
                  type="button"
                  className="nes-btn is-default"
                  onClick={() => router.push(lastGame)}
                >
                  Resume Last Game
                </button>
              ) : null}
            </div>
          </form>

          {/* Social links with NES-styled icons */}
          <section className="flex items-center justify-center gap-4 py-6">
            <a
              href="https://x.com/thisisabhinay"
              target="_blank"
              className="nes-icon twitter is-large"
            />

            <a
              href="https://www.linkedin.com/in/thisisabhinay"
              target="_blank"
              className="nes-icon linkedin is-large"
            />
          </section>
        </div>
      </div>
    </main>
  );
}
