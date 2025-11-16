"use client";

import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  src: string;
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay when component mounts
    const tryAutoplay = async () => {
      try {
        await audio.play();
        setHasUserInteracted(true);
      } catch (error) {
        // Autoplay was prevented, user needs to interact first
        console.log("Autoplay prevented, waiting for user interaction");
      }
    };

    // Set loop
    audio.loop = true;

    // Try autoplay after a short delay
    const timer = setTimeout(() => {
      tryAutoplay();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasUserInteracted) {
      // First click - start playing
      audio.play().then(() => {
        setHasUserInteracted(true);
        setIsMuted(false);
      });
    } else {
      // Toggle mute
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  const isPlaying = hasUserInteracted && !isMuted;

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <button
        onClick={handleToggleMute}
        className="fixed bottom-4 left-4 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-gray-200"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        <div 
          className={`relative ${isPlaying ? 'animate-spin-slow' : ''}`}
          style={{ transition: 'transform 0.3s ease' }}
        >
          {/* Music Note Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
      </button>
    </>
  );
}

