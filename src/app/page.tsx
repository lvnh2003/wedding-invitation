"use client";

import { useEffect, useState } from "react";
import { CurtainAnimation } from "./components/CurtainAnimation";
import { WeddingInvitationContent } from "./components/WeddingInvitationContent";
import { AudioPlayer } from "./components/AudioPlayer";
import {
  ANIMATION_DURATION,
  FAST_ANIMATION_DURATION,
} from "./constants";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [shouldShowContent, setShouldShowContent] = useState(false);

  useEffect(() => {
    // Wait for delay, then start animation
    const animationStartTimer = setTimeout(() => {
      setIsAnimating(false);
    }, FAST_ANIMATION_DURATION);

    // Wait for animation to complete before enabling scroll
    const animationCompleteTimer = setTimeout(() => {
      setShouldShowContent(true);
    }, FAST_ANIMATION_DURATION + ANIMATION_DURATION);

    return () => {
      clearTimeout(animationStartTimer);
      clearTimeout(animationCompleteTimer);
    };
  }, []);

  const mainContainerClass = shouldShowContent
    ? "relative w-full min-h-screen overflow-auto bg-white"
    : "relative w-full h-screen overflow-hidden bg-white";

  return (
    <main className={mainContainerClass}>
      {!shouldShowContent && (
        <CurtainAnimation
          isAnimating={isAnimating}
          animationDuration={ANIMATION_DURATION}
        />
      )}
      <WeddingInvitationContent isVisible={shouldShowContent} />
      {/* Audio Player - Add your music file to /public folder and update the path */}
      <AudioPlayer src="/audio.mp3" />
    </main>
  );
}
