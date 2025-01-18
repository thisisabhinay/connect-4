/**
 * @description Maps player IDs (numbers) to CSS class strings for styling individual players.
 * Each key represents a unique player identifier that links to its corresponding style class.
 * Keys are numeric to match standard player ID formats while values contain CSS class names.
 *
 * @param {number} key - Unique numeric identifier for each player
 * @param {string} value - CSS class name string to be applied to the player element
 */
export type PlayerStyleMap = {
  [key: number]: string;
};
