"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  text: string;
  bgClass?: string;
  BclassName?: string;
  TclassName?: string;
}

export default function HoverButton({
  text,
  bgClass = "bg-white",
  BclassName = "rounded-full border border-white/20 px-10 py-4 text-lg font-semibold text-white",
  TclassName,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);

  const xTo = useRef<((value: number) => void) | null>(null);
  const yTo = useRef<((value: number) => void) | null>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    xTo.current = gsap.quickTo(circleRef.current, "x", {
      duration: 0.25,
      ease: "power3.out",
    });

    yTo.current = gsap.quickTo(circleRef.current, "y", {
      duration: 0.25,
      ease: "power3.out",
    });
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !circleRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    xTo.current?.(e.clientX - rect.left);
    yTo.current?.(e.clientY - rect.top);

    gsap.to(circleRef.current, {
      scale: 20,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    xTo.current?.(e.clientX - rect.left);
    yTo.current?.(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    if (!circleRef.current) return;

    gsap.to(circleRef.current, {
      scale: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center justify-center overflow-hidden cursor-pointer ${BclassName}`}>
      <span
        ref={circleRef}
        className={`absolute left-0 top-0 h-8 w-8 rounded-full ${bgClass}`}
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          transformOrigin: "center",
        }}
      />

      <span className={`relative z-10 ${TclassName}`}>{text}</span>
    </button>
  );
}
