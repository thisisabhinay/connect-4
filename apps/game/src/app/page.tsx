"use client";

import { GameBoard } from "@/components/game-board";
import { GameResource } from "@/types/game";
import { generateEmptyBoard } from "@/utils/game";
import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "/api/save-game";
const ROWS = 6;
const COLS = 5;

export default function Home() {
  const [game, setGame] = useState<GameResource>();

  async function initGameState() {
    const { data } = await axios.post(API_URL, {
      board: generateEmptyBoard(ROWS, COLS),
      lastPlayer: 2,
      activePlayer: 1,
      rows: ROWS,
      cols: COLS,
      isGameOver: false,
      winner: null,
      winningCells: [],
    });

    console.log(data);
    setGame(data);
  }

  useEffect(() => {
    initGameState();
  }, []);

  // function isFillable() {}

  return (
    <main
      data-comp="Home"
      className="bg-slate-100 gap-10 h-screen grid grid-cols-1 auto-rows-max items-center justify-center"
    >
      <h1 className="text-5xl text-center font-bold">Connect4</h1>

      {game?.id ? <GameBoard {...game} /> : null}
    </main>
  );
}
