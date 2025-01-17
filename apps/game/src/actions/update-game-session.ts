"use server";

import axios from "axios";
import { type GameResource } from "@/types/game";

const BASE_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "";

if (!BASE_URL) {
  throw new Error("Base URL is not set. This is required to store game data.");
}

export async function updateGameSession(game: GameResource) {
  try {
    const updatedGame: GameResource = {
      ...game,
    };

    const { data } = await axios.patch(`${BASE_URL}/${game.id}`, updatedGame);

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
    console.error("Unexpected error saving game:", error);
    throw new Error("Failed to save game session. Please try again.");
  }
}
