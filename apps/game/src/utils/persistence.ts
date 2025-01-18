"use client";
import { LOCAL_PERSISTENCE_KEY } from "@/const";

/**
 * Stores the URL of the last played game in localStorage by first clearing
 * any existing value and then setting the new URL. This two-step process
 * ensures a clean state transition and prevents partial writes.
 *
 * @param url The fully qualified URL of the game to persist
 */
export function persistLastGame(url: string) {
  if (window) {
    window.localStorage.setItem(LOCAL_PERSISTENCE_KEY, "");
    window.localStorage.setItem(LOCAL_PERSISTENCE_KEY, url);
  }
}

/**
 * Retrieves the URL of the last played game from localStorage.
 * Falls back to an empty string if no game has been persisted,
 * preventing undefined states in the application flow.
 *
 * @returns The stored game URL or an empty string if none exists
 */
export function getLastGame(): string {
  if (!window) return "";
  return window.localStorage.getItem(LOCAL_PERSISTENCE_KEY) ?? "";
}
