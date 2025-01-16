"use client";

import { GameBoard } from "@/components/game-board";
import { Game } from "@/types/game";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "/api/save-game";

export default function Home() {
  const [game, setGame] = useState<Game>({
    board: {},
    lastPlayer: 0,
    rows: 0,
    cols: 0,
  });

  async function initGameState() {
    const { data } = await axios.post(API_URL, {
      board: {
        "0_0": 0,
        "0_1": 0,
        "0_2": 0,
        "0_3": 0,
        "1_0": 0,
        "1_1": 0,
        "1_2": 0,
        "1_3": 2,
        "2_0": 0,
        "2_1": 0,
        "2_2": 1,
        "2_3": 1,
        "3_0": 1,
        "3_1": 2,
        "3_2": 2,
        "3_3": 1,
      },
      lastPlayer: 1,
      cols: 4,
      rows: 4,
    });
    setGame(data.game);
  }

  useEffect(() => {
    initGameState();
  }, []);

  // function isFillable() {}

  return (
    <main
      data-comp="Home"
      className="bg-slate-100 h-screen flex items-center justify-center"
    >
      <GameBoard {...game} />
    </main>
  );
}
