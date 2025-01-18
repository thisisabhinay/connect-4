"use client";

import { GameBoard } from "@/components/game-board";
import { Header } from "@/components/header";
import { NoGame } from "@/components/no-game";
import { PlayerCharacter } from "@/components/player-character";
import { PLAYER_ONE, PLAYER_TWO } from "@/const";
import { useWindowSize } from "@/hooks/use-window-size";
import { GameResource } from "@/types/game";
import { persistLastGame } from "@/utils/persistence";
import axios from "axios";
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
      setIsLoading(true);
      setError("");

      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${BASE_URL}/${id}`);
        setGame(data);
        persistLastGame(`/game/${data.id}`);
      } catch (error) {
        setError("Failed to load game. Please try again later.");
        console.error("Error fetching game:", error);
      } finally {
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

      {error ? <NoGame error={error} /> : null}

      {game?.id ? (
        <div className="h-full max-w-screen-xl mx-auto grid md:grid-cols-[auto_max-content_auto] grid-rows-[1fr] gap-10 justify-center md:px-10 xl:px-20 pb-20">
          {showConfetti ? <Confetti width={width} height={height} /> : null}

          <PlayerCharacter
            isWinner={winner === PLAYER_ONE}
            playerName={game.playerNames[PLAYER_ONE]}
            playerId={PLAYER_ONE}
            showBalloon={activePlayer === PLAYER_ONE}
            gameOver={gameOver}
          />

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

          <PlayerCharacter
            isWinner={winner === PLAYER_TWO}
            playerName={game.playerNames[PLAYER_TWO]}
            playerId={PLAYER_TWO}
            showBalloon={activePlayer === PLAYER_TWO}
            gameOver={gameOver}
          />
        </div>
      ) : null}
    </main>
  );
}
