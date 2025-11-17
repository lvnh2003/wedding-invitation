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
      <div className="bg-transparent p-6 lg:p-8 shadow-lg border border-[#e8a0ae]/30 rounded-2xl">
        {/* Title */}
        <h2 className="font-quicksand text-3xl lg:text-4xl text-gray-800 mb-2 text-center">
          Dress Code
        </h2>
        <div className="h-px flex-1 bg-[#c60025] mb-6 w-1/2 m-auto"></div>
        <div className="flex gap-2 justify-start text-xl">
          <div>Be, </div>
          <div>Đen, </div>
          <div>Nâu</div>
        </div>
      </div>
    </div>
  );
}
