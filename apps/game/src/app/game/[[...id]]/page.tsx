"use client";

import { GameBoard } from "@/components/game-board";
import { GameResource } from "@/types/game";
import { Logo } from "@repo/assets/image";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState<GameResource>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

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

  useEffect(() => {
    document.body.classList.remove("animate-bg");
    document.body.classList.add("bg-landscape");
    document.body.classList.add("bg-right");
  }, []);

  return (
    <main
      data-comp="GamePage"
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
      <h1 className="text-5xl text-center font-bold">Connect4</h1>

      {isLoading ? (
        <div className="text-center">Loading game...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : game?.id ? (
        <GameBoard {...game} />
      ) : (
        <div className="text-center">No game found</div>
      )}
    </main>
  );
}
