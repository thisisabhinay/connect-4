"use client";

import { GameBoard } from "@/components/game-board";
import { GameResource } from "@/types/game";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "/api/save-game";
export default function Home() {
  const [game, setGame] = useState<GameResource>();
  useEffect(() => {
    axios
      .post(API_URL, {
        board: [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ],
        lastPlayer: 1,
      })
      .then(({ data }) => setGame(data.game));
  }, []);

  return (
    <main
      data-comp="Home"
      className="bg-slate-100 h-screen flex items-center justify-center"
    >
      <GameBoard game={game} />
    </main>
  );
}
