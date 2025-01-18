"use server";

import { nanoid } from "nanoid";
import axios from "axios";
import { generateEmptyBoard } from "@/utils/game";
import { type GameResource } from "@/types/game";

const BASE_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "";

if (!BASE_URL) {
  throw new Error("Base URL is not set. This is required to store game data.");
}

export async function createGameSession(formData: FormData) {
  const player1 = formData.get("player1")?.toString();
  const player2 = formData.get("player2")?.toString();
  const rows = parseInt(formData.get("rows")?.toString() ?? "5");
  const cols = parseInt(formData.get("cols")?.toString() ?? "5");

  // Input validation helps catch issues before making external API calls
  if (!player1 || !player2) {
    throw new Error("Both player names are required");
  }

  try {
    const newGame: GameResource = {
      id: nanoid(),
      lastUpdate: new Date().toISOString(),
      board: generateEmptyBoard(rows, cols),
      lastPlayer: 2,
      activePlayer: 1,
      rows: rows,
      cols: cols,
      isGameOver: false,
      winner: 0,
      winningCells: [],
      playerNames: {
        1: player1,
        2: player2,
      },
    };

    const { data } = await axios.post(BASE_URL, newGame);
    // return redirect(`/game/${data.id}`);
    return data;
  } catch (error) {
    // For axios errors, we can provide more specific error messages
    if (axios.isAxiosError(error)) {
      console.error("API Error:", {
        status: error.response?.status,
        message: error.response?.data?.message,
        url: BASE_URL,
      });
      throw new Error(
        error.response?.data?.message ||
          "Failed to save game data. Please try again.",
      );
    }

    // For any other errors, provide a generic message
    console.error("Unexpected error creating game:", error);
    throw new Error("Failed to create game session. Please try again.");
  }
}
