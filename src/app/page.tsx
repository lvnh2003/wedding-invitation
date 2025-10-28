"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Animation completes after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-white">
      {/* Container for both curtains - no gap between them */}
      <div className="relative w-full h-full flex">
        {/* Left curtain - slides to the left, positioned on top with z-10 */}
        <div
          className={`relative h-full w-1/2 transition-transform duration-[1000ms] ease-out z-10 ${
            isAnimating ? "translate-x-0" : "-translate-x-[120%]"
          }`}
        >
          <div
            className="relative w-full h-full overflow-visible bg-cover bg-center"
            style={{ backgroundImage: "url(/bg-side.png)" }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20">
              <Image
                src="/icon.png"
                alt="Left curtain icon"
                width={100}
                height={100}
                className="block"
              />
            </div>
          </div>
        </div>

        {/* Right curtain - slides to the right */}
        <div
          className={`relative h-full w-1/2 transition-transform duration-[1000ms] ease-out z-0 ${
            isAnimating ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="relative w-full h-full overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url(/bg-side.png)" }}
          />
        </div>
      </div>

      {/* Content revealed after curtains open */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome</h1>
          <p className="text-xl text-gray-600">The curtains have opened</p>
        </div>
      </div>
    </main>
  );
}
