"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import TextType from "./ui/TextType";
import { Timeline } from "./Timeline";
import { DressCode } from "./DressCode";

interface WeddingInvitationContentProps {
  isVisible: boolean;
}

const TITLE_TEXT = "THIỆP MỜI";
const COUPLE_NAMES = "Quốc Điển & Ái Tiên";
const TIME_TEXT = "Thứ 5 - 10H00";
const DATE_TEXT = "21.10.2025";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animationType: "fadeUp" | "fadeLeft" | "fadeRight" | "fadeIn" | "zoomIn";
  delay?: number;
  autoShow?: boolean;
}

function AnimatedSection({
  children,
  animationType,
  delay = 0,
  autoShow = false,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(autoShow);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoShow) {
      setIsVisible(true);
      return;
    }

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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [autoShow]);

  const getAnimationClasses = () => {
    const baseTransition = "transition-all duration-700 ease-out";
    let initialClass = "";

    switch (animationType) {
      case "fadeUp":
        initialClass = isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-12";
        break;
      case "fadeLeft":
        initialClass = isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-12";
        break;
      case "fadeRight":
        initialClass = isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-12";
        break;
      case "fadeIn":
        initialClass = isVisible ? "opacity-100" : "opacity-0";
        break;
      case "zoomIn":
        initialClass = isVisible
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95";
        break;
    }

    return `${baseTransition} ${initialClass}`;
  };

  return (
    <div
      ref={sectionRef}
      className={getAnimationClasses()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ThreeImagesWithScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center mt-10 mb-8 h-64 sm:h-80 md:h-96 overflow-visible"
    >
      <div className="relative flex items-center justify-center gap-2 sm:gap-4 w-full">
        {/* Left Image */}
        <div
          className={`relative transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-20 scale-75"
          }`}
        >
          <Image
            src="/main.png"
            alt="Wedding invitation image left"
            width={400}
            height={400}
            className="w-28 sm:w-36 md:w-44 h-auto rounded-lg shadow-lg object-cover"
            priority
          />
        </div>

        {/* Center Image */}
        <div className="relative z-10">
          <Image
            src="/main.png"
            alt="Wedding invitation main image"
            width={400}
            height={400}
            className="w-40 sm:w-52 md:w-64 h-auto rounded-lg shadow-xl object-cover"
            priority
          />
        </div>

        {/* Right Image */}
        <div
          className={`relative transition-all duration-1000 ease-out ${
            isVisible
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 translate-x-20 scale-75"
          }`}
        >
          <Image
            src="/main.png"
            alt="Wedding invitation image right"
            width={400}
            height={400}
            className="w-28 sm:w-36 md:w-44 h-auto rounded-lg shadow-lg object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}

function PhotoAlbum() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

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

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const photos = [
    { src: "/main.png", alt: "Wedding photo 1" },
    { src: "/main.png", alt: "Wedding photo 2" },
    { src: "/main.png", alt: "Wedding photo 3" },
    { src: "/main.png", alt: "Wedding photo 4" },
    { src: "/main.png", alt: "Wedding photo 5" },
    { src: "/main.png", alt: "Wedding photo 6" },
  ];

  useEffect(() => {
    if (!isVisible) return;

    const startAutoPlay = () => {
      autoPlayTimerRef.current = setInterval(() => {
        setSelectedIndex((prev) => (prev + 1) % photos.length);
      }, 4000); // Change photo every 4 seconds
    };

    startAutoPlay();

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isVisible, photos.length]);

  useEffect(() => {
    const thumbnail = sliderRef.current?.children[selectedIndex] as HTMLElement;
    if (thumbnail && sliderRef.current) {
      const thumbnailLeft = thumbnail.offsetLeft;
      const thumbnailWidth = thumbnail.offsetWidth;
      const sliderWidth = sliderRef.current.offsetWidth;
      const scrollLeft = thumbnailLeft - (sliderWidth - thumbnailWidth) / 2;
      sliderRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    autoPlayTimerRef.current = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
  };

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className="py-8 px-6">
      <AnimatedSection animationType="fadeUp" delay={0} autoShow={isVisible}>
        <h2 className="font-quicksand text-3xl text-gray-800 text-center mb-8">
          Album Ảnh
        </h2>
      </AnimatedSection>

      {/* Main Image */}
      <AnimatedSection animationType="zoomIn" delay={100} autoShow={isVisible}>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-100">
            <Image
              src={photos[selectedIndex].src || "/placeholder.svg"}
              alt={photos[selectedIndex].alt}
              width={600}
              height={600}
              className="w-full h-auto aspect-square object-cover transition-all duration-300"
            />
          </div>
          <p className="text-center text-gray-600 text-sm mt-3">
            {selectedIndex + 1} / {photos.length}
          </p>
        </div>
      </AnimatedSection>

      {/* Image Slider */}
      <AnimatedSection animationType="fadeUp" delay={150} autoShow={isVisible}>
        <div className="w-full mx-auto">
          <div className="flex items-center gap-4">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Scroll left"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Slider Container */}
            <div
              ref={sliderRef}
              className="flex-1 overflow-x-auto scroll-smooth hide-scrollbar"
              style={{ scrollBehavior: "smooth" }}
            >
              <div className="flex gap-3 pb-2">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                      selectedIndex === index
                        ? "ring-2 ring-[#c60025] ring-offset-2 scale-105"
                        : "hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={photo.src || "/placeholder.svg"}
                      alt={photo.alt}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="flex-shrink-0 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Scroll right"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    relation: "",
    message: "",
    attending: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAttendingChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      attending: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/send-rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send RSVP");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        relation: "",
        message: "",
        attending: "",
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      setError("Có lỗi khi gửi. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 pt-4 pb-8">
      {submitted ? (
        <div className="max-w-md mx-auto bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-700 font-medium">
            ✓ Cảm ơn bạn! Lời chúc của bạn đã được gửi thành công.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-4 text-left"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Tên của bạn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên của bạn<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Ví dụ: Nguyễn Văn A"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c60025] focus:border-transparent"
            />
          </div>

          {/* Bạn là gì của dâu/rể */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bạn là gì của cô dâu/chú rể?
            </label>
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              placeholder="Ví dụ: Bạn cô dâu, bạn chú rể, đồng nghiệp..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c60025] focus:border-transparent"
            />
          </div>

          {/* Gửi lời chúc */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gửi lời chúc đến cô dâu & chú rể
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Viết vài lời chúc dễ thương cho hai bạn nhé..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#c60025] focus:border-transparent"
            />
          </div>

          {/* Bạn có tham dự không? */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Bạn có tham dự không?<span className="text-red-500">*</span>
            </span>
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                <input
                  type="radio"
                  name="attending"
                  value="yes"
                  checked={formData.attending === "yes"}
                  onChange={() => handleAttendingChange("yes")}
                  required
                  className="text-[#c60025]"
                />
                <span>Có</span>
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-800">
                <input
                  type="radio"
                  name="attending"
                  value="no"
                  checked={formData.attending === "no"}
                  onChange={() => handleAttendingChange("no")}
                  className="text-[#c60025]"
                />
                <span>Không</span>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c60025] text-white py-2.5 rounded-md text-sm font-medium uppercase tracking-wide shadow-md hover:bg-[#a0001e] disabled:bg-gray-400 transition-colors duration-300"
            >
              {loading ? "Đang gửi..." : "Gửi Xác Nhận"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export function WeddingInvitationContent({
  isVisible,
}: WeddingInvitationContentProps) {
  const containerClass = isVisible
    ? "flex items-center justify-center"
    : "absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none";

  return (
    <div className={containerClass}>
      <div className="text-center w-full bg-white shadow-lg overflow-hidden">
        <AnimatedSection animationType="zoomIn" delay={0} autoShow={true}>
          <div className="pb-6">
            <div className="relative -mx-6 overflow-visible">
              <div className="relative">
                <Image
                  src="/main.png"
                  alt="Couple photo"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />

                <Image
                  src="/flower.png"
                  alt="Flower decoration"
                  width={400}
                  height={300}
                  className="absolute -top-15 -right-10 w-40 h-auto z-10 opacity-70"
                />
                <div className="absolute bottom-0 left-0 right-0 h-100 bg-linear-to-t from-white via-white/20 to-transparent pointer-events-none"></div>

                <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection animationType="fadeUp" delay={100} autoShow={true}>
          <div className="pb-2 text-center">
            <h1 className="font-motherland-signature text-3xl text-gray-800">
              {COUPLE_NAMES}
            </h1>
          </div>
        </AnimatedSection>
        <div>
          <div className="flex justify-around items-center flex-col">
            <div>
              <div className="flex justify-around items-center flex-col gap-8 px-4 py-6">
                <div className="flex justify-center items-start gap-5 w-full flex-col">
                  {/* Groom's family */}
                  <AnimatedSection animationType="fadeLeft" delay={200}>
                    <h3 className="font-quicksand  text-sm font-semibold text-gray-600 mb-3 tracking-widest">
                      NHÀ TRAI
                    </h3>
                    <div className="space-y-1">
                      <p className="font-quicksand text-base md:text-lg font-bold text-gray-800 whitespace-nowrap">
                        ÔNG: TRÀ QUỐC BẢO
                      </p>
                      <p className="font-quicksand  text-base md:text-lg font-bold text-gray-800">
                        BÀ: NGUYỄN THỊ HỒNG VÂN
                      </p>
                    </div>
                    <p className="font-quicksand  text-sm text-gray-600 mt-2">
                      Tam Kỳ, Quảng Nam
                    </p>
                  </AnimatedSection>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-300"></div>

                  {/* Bride's family */}
                  <AnimatedSection animationType="fadeRight" delay={200}>
                    <h3 className="font-quicksand  text-sm font-semibold text-gray-600 mb-3 tracking-widest">
                      NHÀ GÁI
                    </h3>
                    <div className="space-y-1">
                      <p className="font-quicksand  text-base md:text-lg font-bold text-gray-800 whitespace-nowrap">
                        ÔNG: TRÀ QUỐC BẢO
                      </p>
                      <p className="font-quicksand  text-base md:text-lg font-bold text-gray-800">
                        BÀ: NGUYỄN THỊ HỒNG VÂN
                      </p>
                    </div>
                    <p className="font-quicksand  text-sm text-gray-600 mt-2">
                      Tam Kỳ, Quảng Nam
                    </p>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TextType
          text={["Trân trọng báo tin lễ thành hôn của chúng tôi!"]}
          typingSpeed={75}
          pauseDuration={2000}
          showCursor={true}
          cursorCharacter="|"
          className="text-xl"
        />
        {/* Three Images with Scroll Animation */}
        <ThreeImagesWithScrollAnimation />
        <AnimatedSection animationType="zoomIn" delay={100}>
          <div>
            THAM DỰ TIỆC MỪNG LỄ THÀNH HÔN
            <br />
            Vào Lúc
          </div>
        </AnimatedSection>
        <AnimatedSection animationType="fadeUp" delay={200}>
          <div className="flex justify-around items-center mt-3">
            <div>10 giờ 00</div>
            <div className="flex justify-around items-center flex-col border-l border-r px-4 gap-2">
              <div className="font-quicksand  text-sm">Chủ Nhật</div>
              <div className="font-quicksand  text-4xl font-bold">14</div>
              <div>Tháng 12</div>
            </div>
            <div>Năm 2025</div>
          </div>
        </AnimatedSection>

        {/* Calendar Component */}
        <AnimatedSection animationType="fadeUp" delay={200}>
          <div className="flex justify-center items-center py-8">
            <div className="relative bg-white p-2 sm:p-8 max-w-md w-full">
              {/* Calendar Header */}
              <div className="text-right">
                <div className="font-quicksand text-3xl text-[#c60025]">
                  Tháng 12{" "}
                  <span className="text-8xl font-bold font-quicksand ">
                    2025
                  </span>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 border-l border-t border-gray-200">
                {/* Weekday Headers */}
                {[
                  "Chủ Nhật",
                  "Thứ 2",
                  "Thứ 3",
                  "Thứ 4",
                  "Thứ 5",
                  "Thứ 6",
                  "Thứ 7",
                ].map((day, idx) => (
                  <div
                    key={idx}
                    className="text-center font-quicksand  text-xs sm:text-sm font-semibold bg-gray-600 text-white py-2 border-r border-b border-gray-200 last:border-r-0"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {(() => {
                  const days = [];
                  const firstDay = new Date(2025, 11, 1).getDay(); // December 2025, 0 = Sunday
                  const daysInMonth = 31;
                  const weddingDay = 14;
                  const totalCells = firstDay + daysInMonth;
                  const totalRows = Math.ceil(totalCells / 7);

                  // Empty cells for days before month starts
                  for (let i = 0; i < firstDay; i++) {
                    const rowIndex = Math.floor(i / 7);
                    const isLastRow = rowIndex === totalRows - 1;
                    days.push(
                      <div
                        key={`empty-${i}`}
                        className={`aspect-square border-r border-b border-gray-200 last:border-r-0 ${
                          isLastRow ? "border-b-0" : ""
                        }`}
                      ></div>
                    );
                  }

                  // Days of the month
                  for (let day = 1; day <= daysInMonth; day++) {
                    const isWeddingDay = day === weddingDay;
                    const isLastInRow = (day + firstDay - 1) % 7 === 6;
                    const cellIndex = firstDay + day - 1;
                    const rowIndex = Math.floor(cellIndex / 7);
                    const isLastRow = rowIndex === totalRows - 1;
                    const isBottomRight = day >= 25; // Days in bottom right area

                    days.push(
                      <div
                        key={day}
                        className={`aspect-square flex items-center justify-center font-quicksand  border-r border-b border-gray-200 relative ${
                          isLastInRow ? "border-r-0" : ""
                        } ${isLastRow ? "border-b-0" : ""} ${
                          isWeddingDay
                            ? "bg-white"
                            : isBottomRight
                            ? "text-gray-400 text-xs font-light"
                            : "text-gray-800 text-sm sm:text-base"
                        }`}
                      >
                        {isWeddingDay ? (
                          <>
                            <Image
                              src={"/heart.png"}
                              width={60}
                              height={10}
                              alt="heart"
                            />
                            {/* Day number inside heart */}
                            <span className="absolute text-black font-bold text-xs sm:text-sm z-10">
                              {day}
                            </span>
                          </>
                        ) : (
                          day
                        )}
                      </div>
                    );
                  }

                  return days;
                })()}
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animationType="fadeUp" delay={200}>
          <div>
            <div className="font-quicksand text-2xl mt-2">
              Xác Nhận Tham Dự
              <br /> & <br /> Gửi Lời Chúc
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection animationType="fadeUp" delay={250}>
          <RSVPForm />
        </AnimatedSection>

        <AnimatedSection animationType="fadeUp" delay={200}>
          <div className="mt-8">
          <div className="absolute inset-0 bg-[url('/flower.png')] bg-cover bg-center bg-no-repeat opacity-20"></div>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <Timeline />
              <div className="flex justify-end w-full -mt-20">
                <DressCode />
              </div>
            </div>
          </div>
        </AnimatedSection>
        <PhotoAlbum />
        <AnimatedSection animationType="fadeUp" delay={250}>
          <div className="border-t border-gray-200 mt-12 pt-12 pb-8">
            <div className="space-y-4">
              <p className="font-quicksand text-4xl text-[#c60025] mb-6">
                Rất Hân Hạnh Được Đón Tiếp
              </p>

              <div className="space-y-2">
                <p className="font-quicksand  text-lg font-bold text-gray-800">
                  Quốc Điển & Ái Tiên
                </p>
                <p className="font-quicksand  text-gray-600">
                  Chủ Nhật, 14 Tháng 12 Năm 2025
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-4 flex-wrap">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#c60025] transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333H16V2.169c-.585-.089-1.308-.169-2.227-.169-2.995 0-5.773 1.714-5.773 5.447V8z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-[#c60025] transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225 1.664 4.771 4.919 4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.015-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection animationType="zoomIn" delay={0} autoShow={true}>
          <div className="px-6 pt-8">
            <div className="relative -mx-6 overflow-visible">
              <div className="relative">
                <Image
                  src="/footer.png"
                  alt="Couple photo"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />

                {/* lớp mờ trắng phía trên */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent pointer-events-none" />

                {/* Text kiểu Event Highlights */}
                <div className="absolute top-6 left-6 right-10 md:left-10 md:top-10">
                  <div className="text-3xl leading-tight font-quicksand">
                    Địa Điểm Tổ Chức
                  </div>

                  <div className="mt-4 space-y-2 font-quicksand text-lg">
                    <div className="flex items-center justify-between border-b border-black/10 pb-1">
                      <span className="text-gray-500">Địa chỉ</span>
                      <span className="ml-3">
                        Nhà hàng ABC – Quận 1, TP.HCM
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-black/10 pb-1">
                      <span className="text-gray-500">
                        Thời gian
                      </span>
                      <span className="ml-3">10:00 – 12:00, 14/12/2025</span>
                    </div>
                    <div className="flex items-center justify-between pb-1">
                      <span className="text-gray-500">Gửi xe</span>
                      <span className="ml-3">
                        Bãi xe ngay trước sảnh chính
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
