"use client";

import { useEffect, useRef, useState } from "react";

export function DressCode() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`relative w-2/3 px-6 py-12 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="bg-white p-6 lg:p-8 shadow-lg border border-[#e8a0ae]/30 backdrop-blur-sm">
        {/* Title */}
        <h2 className="font-motherland-signature text-3xl lg:text-4xl text-gray-800 mb-2 text-center">
          Dress Code
        </h2>
        <div className="h-px flex-1 bg-[#c60025] mb-6 w-1/2 m-auto"></div>
        <div className="flex gap-2 justify-between">
          <div className="w-10 h-10 bg-black"></div>
          <div className="w-10 h-10 bg-amber-100"></div>
          <div className="w-10 h-10 bg-amber-950"></div>
          <div className="w-10 h-10 bg-amber-800"></div>
        </div>
      </div>
    </div>
  );
}
