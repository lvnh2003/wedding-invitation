"use client";

import Image from "next/image";

interface CurtainAnimationProps {
  isAnimating: boolean;
  animationDuration?: number;
}

export function CurtainAnimation({
  isAnimating,
  animationDuration = 1000,
}: CurtainAnimationProps) {
  const leftCurtainClass = isAnimating ? "translate-x-0" : "-translate-x-full";
  const rightCurtainClass = isAnimating ? "translate-x-0" : "translate-x-full";
  const iconTransformClass = isAnimating ? "translate-x-1/2" : "translate-x-0";
  const transitionStyle = { transitionDuration: `${animationDuration}ms` };

  return (
    <div className="relative w-full h-full flex">
      {/* Left curtain - slides to the left */}
      <div
        className={`relative h-full w-1/2 transition-transform ease-out z-20 ${leftCurtainClass}`}
        style={transitionStyle}
      >
        <div
          className="relative w-full h-full overflow-visible bg-contain bg-center"
          style={{ backgroundImage: "url(/bg-side.png)" }}
        >
          <div
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 transition-transform ease-out ${iconTransformClass}`}
            style={transitionStyle}
          >
            <Image
              src="/icon.png"
              alt="Wedding icon"
              width={100}
              height={100}
              className="block w-40 h-40"
            />
          </div>
        </div>
      </div>

      {/* Right curtain - slides to the right */}
      <div
        className={`relative h-full w-1/2 transition-transform ease-out z-10 ${rightCurtainClass}`}
        style={transitionStyle}
      >
        <div
          className="relative w-full h-full overflow-hidden bg-contain bg-center"
          style={{ backgroundImage: "url(/bg-side.png)" }}
        />
      </div>
    </div>
  );
}
