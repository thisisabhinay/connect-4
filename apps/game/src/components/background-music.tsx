"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RetroMusic } from "@repo/assets/sound";
import { SpeakerOn, SpeakerOff } from "@repo/assets/image";
import { NESCursor } from "@/config/nes-cursor";

const ICON_SIZE = 92;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Handle audio playback when mute state changes
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

  const toggleSound = () => {
    setIsMuted((prevMuted) => !prevMuted);
  };

  return (
    <div className="relative">
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
