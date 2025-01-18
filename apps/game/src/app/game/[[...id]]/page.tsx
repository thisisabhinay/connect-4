"use client";

import { GameBoard } from "@/components/game-board";
import { Header } from "@/components/header";
import { GameResource } from "@/types/game";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<GameResource>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [activePlayer, setActivePlayer] = useState<number>(
    game?.activePlayer ?? 0,
  );

  useEffect(() => {
    async function fetchGame() {
      // Reset states at the start of each fetch
      setIsLoading(true);
      setError("");

      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${BASE_URL}/${id}`);
        setGame(data);
      } catch (error) {
        setError("Failed to load game. Please try again later.");
        console.error("Error fetching game:", error);
      } finally {
        // Always mark loading as complete, whether the request succeeded or failed
        setIsLoading(false);
      }
    }

    fetchGame();
  }, [id]);

  return (
    <main
      data-comp="GamePage"
      className="grid grid-cols-1 auto-rows-max items-center justify-center bg-fixed bg-black bg-landscape bg-right animate-bg bg-cover"
    >
      <Header />

      {isLoading ? <div className="text-center">Loading game...</div> : null}

      {error ? <div className="text-red-500 text-center">{error}</div> : null}

      {game?.id ? (
        <div className="h-full max-w-screen-xl mx-auto grid md:grid-cols-[auto_max-content_auto] grid-rows-[1fr] gap-10 justify-center md:px-10 xl:px-20 pb-20">
          <section className="message-list relative self-center justify-self-end">
            <section className="message -left">
              <div className="flex flex-col gap-2 items-center">
                <i className="nes-charmander scale-x-[-1]" />
                <i className="nes-badge">
                  <span className="is-primary">P1: {game.playerNames[1]}</span>
                </i>
              </div>
              {activePlayer === 1 ? (
                <div className="nes-balloon from-right absolute -top-28 -left-28">
                  <p>My turn</p>
                </div>
              ) : null}
            </section>
          </section>
          <div className="relative">
            <i className="nes-octocat animate duration-500 absolute z-0 top-10 -left-14 -rotate-[56deg] hover:left-[-2.5rem]" />
            <GameBoard
              {...game}
              onPlayerUpdateAction={(activePlayer) =>
                setActivePlayer(activePlayer)
              }
            />
          </div>
          <section className="message-list relative self-center justify-self-start">
            <section className="message -left">
              <div className="flex flex-col gap-2 items-center">
                <i className="nes-kirby" />
                <i className="nes-badge">
                  <span className="is-error">P2: {game.playerNames[2]}</span>
                </i>
              </div>
              {activePlayer === 2 ? (
                <div className="nes-balloon from-left absolute -top-28 -right-28">
                  <p>My turn</p>
                </div>
              ) : null}
            </section>
          </section>
        </div>
      ) : null}
    </main>
  );
}
