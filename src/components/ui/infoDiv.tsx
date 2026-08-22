"use client";

import { ComponentType, useEffect, useRef } from "react";
import gsap from "gsap";

interface PropsInfo {
  icon: ComponentType<{ className?: string }>;
  text?: string;
  className?: string;
  link?: string;
}

const Info_div = ({
  icon: Icon,
  text = "information",
  className = "",
  link = "",
}: PropsInfo) => {
  const divRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const handleClick = () => {
    if (link?.length > 5) {
      window.open(`${link}`, "_blank");
    } else {
      alert("Not Exist Yet :)");
    }
  };

  useEffect(() => {
    if (!divRef.current || !textRef.current) return;
    tl.current = gsap.timeline({ paused: true });

    const h = text.length > 6 ? 210 : 160;

    tl.current
      .to(divRef.current, {
        height: h,
        duration: 0.5,
        ease: "power3.out",
      })
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
  }, [text]);

  const play_animation = () => {
    tl.current?.play();
  };

  const clear_animation = () => {
    tl.current?.reverse();
  };

  // const handleEnter = () => {
  //   if (!divRef.current || !textRef.current) return;
  //   const tl = gsap.timeline();

  //   tl.to(divRef.current, {
  //     height: 200,
  //     duration: 0.3,
  //     ease: "power.out",
  //   }).to(textRef.current, {
  //     opacity: 1,
  //     duration: 0.3,
  //     ease: "power.out",
  //   });
  // };

  // const handleLeave = () => {
  //   if (!divRef.current || !textRef.current) return;

  //   const tl = gsap.timeline();

  //   tl.to(textRef.current, {
  //     opacity: 0,
  //     duration: 0.3,
  //     ease: "power.out",
  //   }).to(divRef.current, {
  //     height: 80,
  //     duration: 0.6,
  //     ease: "power3.inOut",
  //   });
  // };

  return (
    <div
      ref={divRef}
      onMouseEnter={play_animation}
      onMouseLeave={clear_animation}
      onClick={handleClick}
      className={`
        w-20 h-17 relative
        rounded-b-full
        border-x-2 border-b-2
        border-forest-moss
        bg-sega-green
        shadow-xl
        cursor-pointer
        justify-center
        gap-2 z-10
        overflow-hidden
        ${className}
      `}>
      <span
        ref={textRef}
        className="flex text-nowrap text-2xl text-dark-spruce mt-10 font-bold  rotate-90 font-museo opacity-0
        -translate-y-5">
        {text}
      </span>
      <Icon className="absolute flex w-8 h-8 text-dark-spruce bottom-5 mx-auto inset-0 mt-auto drop-shadow-xl/30" />
    </div>
  );
};

export default Info_div;
