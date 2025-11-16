"use client";

import { useEffect, useRef, useState } from "react";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    time: "10:00",
    title: "Lễ Thành Hôn",
    description: "Lễ thành hôn chính thức",
  },
  {
    time: "11:00",
    title: "Chụp Ảnh Kỷ Niệm",
    description: "Chụp ảnh cùng gia đình",
  },
  {
    time: "12:00",
    title: "Tiệc Trưa",
    description: "Bắt đầu tiệc mừng",
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
    <div ref={ref} className="relative w-full lg:w-2/3 px-6 py-12 lg:py-16">
      <div className="relative">
        {/* Vertical line */}
        <div
          className={`absolute left-6 lg:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#c60025] via-[#e8a0ae] to-white transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Timeline events */}
        <div className="space-y-12">
          {TIMELINE_EVENTS.map((event, index) => (
            <div
              key={index}
              className={`relative ml-20 lg:ml-24 transition-all duration-700 transform ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Dot */}
              <div
                className={`absolute -left-16 lg:-left-20 top-1 w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-white border-4 border-[#c60025] transition-all duration-500 ${
                  isVisible ? "scale-100" : "scale-0"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              ></div>

              {/* Content card */}
              <div className="bg-white rounded-lg p-4 lg:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#e8a0ae]/20">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-roboto text-lg lg:text-xl font-bold text-[#c60025]">
                    {event.time}
                  </span>
                  <div className="h-px flex-1 bg-[#c60025]/20"></div>
                </div>
                <h3 className="font-motherland-signature text-xl lg:text-2xl text-gray-800 mb-1">
                  {event.title}
                </h3>
                <p className="font-roboto text-sm lg:text-base text-gray-600">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
