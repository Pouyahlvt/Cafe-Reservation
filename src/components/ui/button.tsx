"use client";

import { useRef } from "react";
import gsap from "gsap";

interface Props {
  text: string;
  BclassName?: string;
  TclassName?: string;
}

export default function HoverButton({
  text,
  BclassName = "rounded-full border border-white/20 px-10 py-4 text-lg font-semibold text-white",
  TclassName,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);

  const animate = (e: React.MouseEvent<HTMLButtonElement>, scale: number) => {
    if (!buttonRef.current || !circleRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(circleRef.current, {
      x,
      y,
    });

    gsap.to(circleRef.current, {
      scale,
      duration: 0.55,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={(e) => animate(e, 20)}
      onMouseLeave={(e) => animate(e, 0)}
      className={`relative flex justify-center items-center  overflow-hidden 
      cursor-pointer  ${BclassName}`}>
      <span
        ref={circleRef}
        className="absolute left-0 top-0 h-8 w-8 rounded-full bg-white"
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          transformOrigin: "center",
        }}
      />

      <span className={`z-10 mix-blend-difference ${TclassName}`}>{text}</span>
    </button>
  );
}
