"use client";

import { GameBoard } from "@/components/game-board";
import { Header } from "@/components/header";
import { PLAYER_ONE, PLAYER_TWO } from "@/const";
import { useWindowSize } from "@/hooks/use-window-size";
import { GameResource } from "@/types/game";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const BASE_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<GameResource>();
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [winner, setWinner] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState<string>("");
  const [activePlayer, setActivePlayer] = useState<number>(
    game?.activePlayer ?? 0,
  );
  const { width, height } = useWindowSize();

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

      {error ? (
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
      ) : null}

      {game?.id ? (
        <div className="h-full max-w-screen-xl mx-auto grid md:grid-cols-[auto_max-content_auto] grid-rows-[1fr] gap-10 justify-center md:px-10 xl:px-20 pb-20">
          {showConfetti ? <Confetti width={width} height={height} /> : null}
          <section className="message-list relative self-center justify-self-end">
            <section className="message -left">
              <div className="flex flex-col gap-2 items-center">
                <i
                  className={`nes-charmander scale-x-[-1] animate ${winner === PLAYER_ONE ? "animate-bounce" : ""}`}
                />
                <i className="nes-badge">
                  <span className="is-primary">P1: {game.playerNames[1]}</span>
                </i>
              </div>
              {activePlayer === 1 && !gameOver ? (
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
              onPlayerUpdateAction={(activePlayer, winner, isGameOver) => {
                setActivePlayer(activePlayer);
                setShowConfetti([PLAYER_ONE, PLAYER_TWO].includes(winner));
                setGameOver(isGameOver);
                setWinner(winner);
              }}
            />
          </div>
          <section className="message-list relative self-center justify-self-start">
            <section className="message -left">
              <div className="flex flex-col gap-2 items-center">
                <i
                  className={`nes-kirby animate ${winner === PLAYER_TWO ? "animate-bounce" : ""}`}
                />
                <i className="nes-badge">
                  <span className="is-error">P2: {game.playerNames[2]}</span>
                </i>
              </div>
              {activePlayer === 2 && !gameOver ? (
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
