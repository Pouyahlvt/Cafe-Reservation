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

  const next = () => setCurrent((prev) => (prev + 1) % images.length);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    refs.current.forEach((card, index) => {
      if (!card) return;

      let offset = index - current;

      if (offset > images.length / 2) offset -= images.length;
      if (offset < -images.length / 2) offset += images.length;

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
    <div className="relative flex  items-center justify-center w-full h-full overflow-hidden">
      <button
        onClick={prev}
        className="absolute left-8 z-50 text-5xl text-white">
        ←
      </button>

      {images.map((img, index) => (
        <div
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className={`absolute w-[40%] h-[50%] rounded-2xl overflow-hidden  ${current === index ? "shadow-2xl/70 z-20" : ""}`}>
          <Image
            src={img}
            alt="events-image"
            fill
            style={{ objectFit: "cover" }}
            className="select-none"
            sizes="30vw"
            draggable={false}
          />
        </div>
      ))}

      <button
        onClick={next}
        className="absolute right-8 z-50 text-5xl text-white">
        →
      </button>
    </div>
  );
}
