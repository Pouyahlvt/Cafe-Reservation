"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  text: string;
  BclassName?: string;
  TclassName?: string;
  bgClass?: string;
  scaleNum?: number;
  arrow?: boolean;
  onClick?: () => void;
}

export default function HoverButton({
  text,
  BclassName = "rounded-full border border-white/20 px-10 py-4 text-lg font-semibold text-white ",
  TclassName,
  bgClass = "bg-white",
  scaleNum = 25,
  arrow = false,
  onClick = () => {
    console.log("Hi there :) ----- ! This is not working now ! ----- ");
  },
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const arrow_one = useRef<HTMLSpanElement>(null);
  const arrow_two = useRef<HTMLSpanElement>(null);

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
      duration: 0.7,
      ease: "power3.out",
    });
  };

  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!arrow_one.current || !arrow_two.current) return;

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .to(
        arrow_one.current,
        {
          x: 8,
          duration: 1.2,
          ease: "elastic.out(1,0.4)",
        },
        0,
      )
      .to(
        arrow_two.current,
        {
          x: 20,
          duration: 0.5,
          ease: "power3.out",
        },
        0,
      );
  }, []);

  const arrow_animation = () => {
    tl.current?.play();
  };

  const arrow_clear = () => {
    tl.current?.reverse();
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={(e) => {
        animate(e, scaleNum);
        arrow_animation();
      }}
      onMouseLeave={(e) => {
        animate(e, 0);
        arrow_clear();
      }}
      className={`relative flex justify-center items-center  overflow-hidden  
      cursor-pointer  ${BclassName}`}>
      <span
        ref={circleRef}
        className={`absolute left-0 top-0 h-8 w-8 rounded-full ${bgClass}`}
        style={{
          transform: "translate(-50%, -50%) scale(0)",
          transformOrigin: "center",
        }}
      />

      <span className={`z-10  ${TclassName}`}>{text}</span>
      <div
        className={`ml-6 z-10 aspect-square h-[90%] border-2 rounded-full overflow-hidden flex
        ${arrow ? "" : "hidden"}`}>
        <span
          ref={arrow_one}
          className="text-2xl -translate-x-5 translate-y-0.5">
          →
        </span>
        <span
          ref={arrow_two}
          className="text-2xl -translate-x-3 translate-y-0.5">
          →
        </span>
      </div>
    </button>
  );
}
