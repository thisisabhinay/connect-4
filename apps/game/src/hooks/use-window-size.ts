import { useState, useEffect, useRef } from "react";

export function useWindowSize() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
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

    window.addEventListener("resize", handleResize);

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
