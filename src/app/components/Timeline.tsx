"use client";

import { useEffect, useRef, useState } from "react";

interface TimelineEvent {
  time: string;
  title: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    time: "10:00",
    title: "Đón khách",
  },
  {
    time: "11:00",
    title: "Chụp Ảnh",
  },
  {
    time: "12:00",
    title: "Tiệc Trưa",
  },
];

export function Timeline() {
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
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-4/5 pt-4 pb-12 px-4 ml-8 border border-[#e8a0ae]/30 rounded-2xl"
    >
      <div className="text-4xl font-quicksand py-2 mb-3 text-center">
        Timeline
      </div>
      <div className="h-px bg-[#c60025] mb-4 w-1/3 mx-auto" />

      <div className="relative mt-8">
        <div
          className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-[#c60025] transition-opacity duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="space-y-10">
          {TIMELINE_EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex items-start ${
                  isLeft ? "justify-start" : "justify-end"
                } transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                {/* Card bên trái */}
                {isLeft && (
                  <div className="w-1/2 pr-8 text-center">
                    <div>
                      <div className="flex justify-center mb-1">
                        <span className="font-quicksand text-4xl">
                          {event.time}
                        </span>
                      </div>
                      <h3 className="font-quicksand text-xl">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                )}

                {/* Dot ở giữa */}
                <div className="relative w-0">
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-1 w-3 h-3 rounded-full bg-[#c60025] transition-transform duration-500 ${
                      isVisible ? "scale-100" : "scale-0"
                    }`}
                    style={{ transitionDelay: `${index * 120 + 200}ms` }}
                  />
                </div>

                {/* Card bên phải */}
                {!isLeft && (
                  <div className="w-1/2 pl-8 text-left">
                    <div>
                      <div className="flex justify-center mb-1">
                        <span className="font-quicksand text-4xl">
                          {event.time}
                        </span>
                      </div>
                      <h3 className="font-quicksand text-xl">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
