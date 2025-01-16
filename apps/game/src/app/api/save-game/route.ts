import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import { type Game, type GameResource } from "@/types/game";

const BASE_URL = process.env.NEXT_PUBLIC_GAME_URL ?? "";

function handleError(error: unknown) {
  console.error("Error:", error);
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}

export async function GET() {
  try {
    const { data } = await axios.get(BASE_URL);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: Game = await request.json();

    // Validate required fields
    if (!body.board || !body.lastPlayer || !body.rows || !body.cols) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newResource: GameResource = {
      id: crypto.randomUUID(),
      lastUpdate: new Date().toISOString(),
      ...body,
    };

    return NextResponse.json({ game: newResource }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "SyntaxError") {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 },
      );
    }
    return handleError(error);
  }
}
