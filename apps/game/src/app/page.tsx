"use client";

import axios from "axios";
import { useEffect } from "react";

const API_URL = "/api/save-game";
export default function Home() {
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
      .then(({ data }) => console.log(data.game));
  }, []);

  return <main></main>;
}
