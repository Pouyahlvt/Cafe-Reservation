"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface NormalProps {
  placeHolder: string;
}

export const Normal_input = ({ placeHolder }: NormalProps) => {
  const [isFocuse, setIsFocuse] = useState(false);
  const [text, setText] = useState("");
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    const text = textRef.current;
    if (isFocuse) {
      gsap.to(text, {
        opacity: 0,
        x: 30,
        duration: 0.7,
        ease: "power2.out",
      });
    } else {
      gsap.to(text, {
        opacity: 0.5,
        x: 0,
        duration: 0.7,
        ease: "power2.out",
      });
    }
  }, [isFocuse]);
  return (
    <div className="w-full">
      <p ref={textRef} className="absolute mt-4 ml-4 text-2xl opacity-50 z-0">
        {placeHolder}
      </p>

      <input
        onFocus={() => setIsFocuse(true)}
        onBlur={() => setIsFocuse(false)}
        value={text}
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="w-full text-2xl font-museo py-4 px-4 outline-0  rounded-t-2xl z-20"
      />
      <div className="w-full h-1 rounded-full bg-forest-moss "></div>
    </div>
  );
};
