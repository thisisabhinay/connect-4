"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RetroMusic } from "@repo/assets/sound";
import { SpeakerOn, SpeakerOff } from "@repo/assets/image";
import { NESCursor } from "@/config/nes-cursor";

/**
 * Defines pixel dimensions for speaker icons to maintain consistent sizing
 * throughout component rerenders
 */
const ICON_SIZE = 92;

/**
 * Implements background music functionality with mute toggle control.
 * Uses HTMLAudioElement for audio playback and manages state persistence
 * between component remounts.
 *
 * @returns JSX component with audio controls and visual speaker indicator
 */
export function BackgroundMusic() {
  /**
   * Maintains reference to audio DOM element across rerenders to prevent
   * memory leaks and enable direct imperative control of audio playback
   */
  const audioRef = useRef<HTMLAudioElement>(null);

  /**
   * Controls audio mute state. Initializes as muted to prevent unwanted
   * autoplay on page load
   */
  const [isMuted, setIsMuted] = useState(true);

  /**
   * Synchronizes audio element playback with mute state.
   * Handles play() promise rejection that occurs when browser blocks autoplay
   */
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isMuted) {
        audioElement.pause();
      } else {
        audioElement
          .play()
          .catch((error) => console.error("Audio playback failed:", error));
      }
    }
  }, [isMuted]);

  /**
   * Toggles mute state using functional update to ensure state changes
   * are based on previous value, preventing race conditions
   */
  const toggleSound = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <div className="relative">
      {/* Preloads audio file to minimize playback delay on first interaction */}
      <audio ref={audioRef} src={RetroMusic} loop preload="auto" />

      <div
        onClick={toggleSound}
        className="p-3 relative top-1"
        style={NESCursor}
        aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      >
        {isMuted ? (
          <Image
            src={SpeakerOff.src}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt="speaker off"
          />
        ) : (
          <Image
            src={SpeakerOn.src}
            width={ICON_SIZE}
            height={ICON_SIZE}
            alt="speaker on"
          />
        )}
      </div>
    </div>
  );
}
