"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface NormalProps {
  placeHolder: string;
}

interface NumProps {
  range: number[];
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
      <div
        ref={textRef}
        className="absolute mt-4 ml-4 text-2xl opacity-50 pointer-events-none">
        {placeHolder}
      </div>

      <input
        onFocus={() => setIsFocuse(true)}
        onBlur={() => setIsFocuse(false)}
        value={text}
        autoComplete="off"
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="flex w-full text-2xl font-museo py-4 px-4 outline-0  rounded-t-2xl z-20"
      />
      <div className="w-full h-1 rounded-full bg-forest-moss "></div>
    </div>
  );
};

export const Num_input = ({ range }: NumProps) => {
  const [num, setNum] = useState(0);
  const numRef = useRef<HTMLDivElement>(null);
  const numRange = Array.from(
    { length: range[1] - range[0] + 1 },
    (_, i) => range[0] + i,
  );

  return (
    <div className="w-full flex justify-center">
      <div>
        <div className="relative w-10 h-10  mx-auto mb-4 overflow-hidden pb-5">
          <div className="absolute w-10 h-10 bg-forest-moss rotate-45 mt-7 rounded-t-md cursor-pointer"></div>{" "}
        </div>
        <div className="relative flex text-4xl border-y-2 py-7 w-15 h-fit pointer-events-none justify-center items-center">
          {numRange.map((n, i) => (
            <p
              key={`num-${i}`}
              className={`absolute ${num === i ? "" : "opacity-0"}`}>
              {n}
            </p>
          ))}
        </div>
        <div className="relative w-10 h-10  mx-auto mt-4 overflow-hidden pb-5">
          <div className="absolute w-10 h-10 bg-forest-moss rotate-45 -mt-7 rounded-b-md cursor-pointer"></div>{" "}
        </div>
      </div>
    </div>
  );
};
