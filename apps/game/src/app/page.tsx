"use client";

import { GameBoard } from "@/components/game-board";
import { Game } from "@/types/game";
import axios from "axios";
import { useEffect, useState } from "react";
import { gameEngine } from "@/service/game-engine";

const API_URL = "/api/save-game";
export default function Home() {
  const [game, setGame] = useState<Game>({
    board: [[]],
    lastPlayer: 0,
  });

  async function initGameState() {
    const { data } = await axios.post(API_URL, {
      board: [
        [0, 0, 0, 0],
        [0, 1, 0, 0],
        [2, 1, 0, 0],
        [2, 2, 1, 2],
      ],
      lastPlayer: 1,
    });
    setGame(data.game);
  }

  useEffect(() => {
    initGameState();
  }, []);

  useEffect(() => {
    gameEngine.updateGameState(game);
    gameEngine.print();
  }, [game]);

  function isFillable() {}

  return (
    <main
      data-comp="Home"
      className="bg-slate-100 h-screen flex items-center justify-center"
    >
      <GameBoard board={game?.board} lastPlayer={game?.lastPlayer} />
    </main>
  );
}
