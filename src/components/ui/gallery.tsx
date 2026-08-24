"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface Props {
  images: string[];
}

export default function Gallery({ images }: Props) {
  const [current, setCurrent] = useState(0);

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  // Swipe tracking
  const startX = useRef(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  // -----------------------------
  // Swipe handlers
  // -----------------------------

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    isDragging.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    isDragging.current = false;

    const diffX = e.clientX - startX.current;
    const diffY = e.clientY - startY.current;

    // Ignore mostly vertical movement
    if (Math.abs(diffY) > Math.abs(diffX)) return;

    // Minimum swipe distance
    const swipeDistance = 50;

    if (Math.abs(diffX) < swipeDistance) return;

    if (diffX < 0) {
      // Finger moved left
      next();
    } else {
      // Finger moved right
      prev();
    }
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
  };

  // -----------------------------
  // GSAP animation
  // -----------------------------

  useEffect(() => {
    refs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - current;

      if (offset > images.length / 2) {
        offset -= images.length;
      }

      if (offset < -images.length / 2) {
        offset += images.length;
      }

      let x = 0;
      let y = 0;
      let scale = 0;
      let rotation = 0;
      let opacity = 0;
      let z = 0;

      switch (offset) {
        case 0:
          x = 0;
          y = 0;
          scale = 1;
          rotation = 0;
          opacity = 1;
          z = 5;
          break;

        case 1:
          x = 260;
          y = 80;
          scale = 0.75;
          rotation = 25;
          opacity = 1;
          z = 4;
          break;

        case 2:
          x = 420;
          y = 140;
          scale = 0;
          rotation = 45;
          opacity = 0;
          z = 3;
          break;

        case -1:
          x = -260;
          y = 80;
          scale = 0.75;
          rotation = -25;
          opacity = 1;
          z = 4;
          break;

        case -2:
          x = -420;
          y = 140;
          scale = 0;
          rotation = -45;
          opacity = 0;
          z = 3;
          break;

        default:
          opacity = 0;
          scale = 0;
      }

      gsap.to(card, {
        x,
        y,
        scale,
        rotation,
        opacity,
        zIndex: z,
        duration: 0.55,
        ease: "power3.out",
      });
    });
  }, [current, images.length]);

  return (
    <div
      className="relative flex items-center justify-center w-full h-full overflow-hidden touch-pan-y select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}>
      {/* PREVIOUS BUTTON */}
      <button
        onClick={prev}
        className="absolute left-8 z-50 text-5xl text-dark-spruce border-2 rounded-full h-12 aspect-square
        shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] bg-forest-moss -translate-y-5
        cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out active:scale-90">
        <span className="flex -translate-y-2 translate-x-3.5 font-thin">‹</span>
      </button>
      {/* 📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷📷 */}
      {images.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className={`absolute w-[40%] h-[50%] rounded-2xl overflow-hidden cursor-grab ${
            current === index ? "shadow-2xl/70 z-20" : ""
          } ${isDragging ? "cursor-grab" : "cursor-grab"}`}>
          <Image
            src={img}
            alt="events-image"
            fill
            style={{ objectFit: "cover" }}
            className="select-none pointer-events-none "
            sizes="30vw"
            draggable={false}
            loading="eager"
          />
        </div>
      ))}
      {/* NEXT BUTTON */}
      <button
        onClick={next}
        className="absolute right-8 z-50 text-5xl text-dark-spruce border-2 rounded-full h-12 aspect-square
        shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] bg-forest-moss -translate-y-5
        cursor-pointer hover:scale-105 transition-all duration-150 ease-in-out active:scale-90">
        <span className="flex -translate-y-2 translate-x-4 font-thin">›</span>
      </button>
    </div>
  );
}
