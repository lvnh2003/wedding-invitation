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
      className={`relative w-full lg:w-1/3 lg:-ml-16 px-6 py-12 lg:py-16 transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="bg-gradient-to-br from-[#f5f1ed] to-[#faf8f6] rounded-2xl p-6 lg:p-8 shadow-lg border border-[#e8a0ae]/30 backdrop-blur-sm">
        {/* Title */}
        <h2 className="font-motherland-signature text-3xl lg:text-4xl text-gray-800 mb-6 text-center">
          Dress Code
        </h2>

        {/* Content sections */}
        <div className="space-y-6">
          {/* For Her */}
          <div className="bg-white/80 rounded-xl p-4 lg:p-5 border border-[#e8a0ae]/40">
            <h3 className="font-roboto text-lg font-bold text-[#c60025] mb-3 flex items-center gap-2">
              <span className="text-2xl">👰</span> Cho Cô Dâu & Khách Nữ
            </h3>
            <ul className="space-y-2 font-roboto text-sm lg:text-base text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#c60025] font-bold">•</span>
                <span>Áo dài truyền thống hoặc váy lụa</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#c60025] font-bold">•</span>
                <span>Màu sắc: Pastel, trắng, be, hồng nhạt</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#c60025] font-bold">•</span>
                <span>Tránh: Màu đỏ hoặc đen</span>
              </li>
            </ul>
          </div>

          {/* For Him */}
          <div className="bg-white/80 rounded-xl p-4 lg:p-5 border border-[#e8a0ae]/40">
            <h3 className="font-roboto text-lg font-bold text-[#c60025] mb-3 flex items-center gap-2">
              <span className="text-2xl">🤵</span> Cho Chú Rể & Khách Nam
            </h3>
            <ul className="space-y-2 font-roboto text-sm lg:text-base text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#c60025] font-bold">•</span>
                <span>Áo tuxedo hoặc áo vest lịch sự</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#c60025] font-bold">•</span>
                <span>Màu sắc: Đen, xám, be hoặc xanh đậm</span>
              </li>
              <li className="flex gap-2">
                <span className="text-[#c60025] font-bold">•</span>
                <span>Phù hợp trang trọng và lịch sự</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-6 pt-6 border-t border-[#e8a0ae]/30 text-center">
          <p className="font-roboto text-xs lg:text-sm text-gray-600 italic">
            Chúng tôi mong bạn sẽ ăn mặc sang trọng và thoải mái
          </p>
        </div>
      </div>
    </div>
  );
}
