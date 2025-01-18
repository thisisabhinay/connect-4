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

/**
 * API endpoint for game operations, fallback to empty if env var missing
 */
const BASE_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "";

/**
 * Handles the core game loop and state management for a two-player board game.
 * Manages asynchronous game data fetching, player turns, win conditions, and UI state.
 * Uses URL params to identify and load specific game instances from the API.
 */
export default function GamePage() {
  /**
   * Extracts game ID from Next.js route params to identify which game to load
   */
  const { id } = useParams();

  /**
   * Core game state including board configuration, player names, and game progress.
   * Reset on new game fetch or error conditions.
   */
  const [game, setGame] = useState<GameResource>();

  /**
   * Loading state gates UI rendering during async operations.
   * True during initial load and subsequent game data fetches.
   */
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Controls celebration animation visibility on game completion.
   * Triggered when either player achieves victory conditions.
   */
  const [showConfetti, setShowConfetti] = useState(true);

  /**
   * Tracks winning player's ID for victory animations and UI updates.
   * 0 indicates no winner, PLAYER_ONE/PLAYER_TWO for victory states.
   */
  const [winner, setWinner] = useState(0);

  /**
   * Signals game completion state for UI behavior changes.
   * Prevents further moves and enables end-game animations.
   */
  const [gameOver, setGameOver] = useState(false);

  /**
   * Stores error messages from failed API operations.
   * Displayed to user and triggers fallback UI states.
   */
  const [error, setError] = useState<string>("");

  /**
   * Identifies current turn holder for move validation and UI indicators.
   * Initialized from game state if available, defaults to 0.
   */
  const [activePlayer, setActivePlayer] = useState<number>(
    game?.activePlayer ?? 0,
  );

  /**
   * Window dimensions for confetti animation boundaries.
   * Updates responsively with window resizing.
   */
  const { width, height } = useWindowSize();

  /**
   * Initiates game data fetch when component mounts or game ID changes.
   * Handles API error states and updates local storage with successful game loads.
   * Cleans up loading states in finally block to prevent UI stuck states.
   */
  useEffect(() => {
    setError("");
    setIsLoading(true);

    async function fetchGame() {
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
