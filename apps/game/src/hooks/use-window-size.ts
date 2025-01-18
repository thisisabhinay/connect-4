import { useState, useEffect, useRef } from "react";

/**
 * A debounced hook that tracks browser window dimensions, updating only after resize events have settled.
 * Uses a 500ms delay to prevent excessive state updates during rapid window resizing.
 *
 * The hook initializes with either the current window dimensions or zeros if window is undefined
 * (handling SSR scenarios where window object isn't available during initial render).
 *
 * @returns An object containing the current window width and height in pixels
 */
export function useWindowSize() {
  // Maintains reference to timeout between renders, allowing cleanup of pending updates
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Maintains window dimensions, initializing safely for SSR by checking window existence
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    /**
     * Debounced resize handler that updates window dimensions after resize events settle.
     * Clears any pending timeout before starting a new one to ensure only the final
     * resize event triggers a state update.
     */
    const handleResize = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 500);
    };

    // Binds resize listener and sets initial dimensions
    window.addEventListener("resize", handleResize);
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    /**
     * Cleanup function removes event listener and cancels any pending dimension updates.
     * Prevents memory leaks and ensures no state updates occur after component unmount.
     */
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return windowSize;
}
