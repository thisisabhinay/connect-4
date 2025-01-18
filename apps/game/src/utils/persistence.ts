import { LOCAL_PERSISTENCE_KEY } from "@/const";

export function persistLastGame(url: string) {
  localStorage.setItem(LOCAL_PERSISTENCE_KEY, url);
}

export function getLastGame(): string {
  return localStorage.getItem(LOCAL_PERSISTENCE_KEY) ?? "";
}
