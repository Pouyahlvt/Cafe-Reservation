"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";

interface NormalProps {
  placeHolder: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

interface NumProps {
  range: number[];
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export const Normal_input = ({ placeHolder, name, setName }: NormalProps) => {
  const [isFocuse, setIsFocuse] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    const text = textRef.current;
    if (isFocuse || name.length > 0) {
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
  }, [isFocuse, name.length]);
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
        value={name}
        autoComplete="off"
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="flex w-full text-2xl font-museo py-4 px-4 outline-0  rounded-t-2xl z-20"
      />
      <div className="w-full h-1 rounded-full bg-forest-moss "></div>
    </div>
  );
};

export const Num_input = ({
  range,
  limit,
  setLimit,
  count,
  setCount,
}: NumProps) => {
  const [num, setNum] = useState(0);
  const numsRef = useRef<HTMLParagraphElement | null>(null);
  const numRange = Array.from(
    { length: range[1] - range[0] + 1 },
    (_, i) => range[0] + i,
  );

  const next = () => {
    if (num === numRange.length - 1 || limit === 0) {
      setNum(num);
      if (!numsRef.current) return;
    } else {
      setNum(num + 1);
      setCount(count + 1);
      setLimit((i) => i - 1);
    }
  };

  const prev = () => {
    if (num === 0) {
      setNum(num);
    } else {
      setNum(num - 1);
      setCount(count - 1);
      setLimit((i) => i + 1);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div>
        <div className="relative w-10 h-10  mx-auto mb-4 overflow-hidden pb-5">
          <div
            onClick={next}
            className="absolute w-10 h-10 bg-forest-moss rotate-45 mt-7 rounded-md  cursor-pointer active:scale-90 duration-200"></div>{" "}
        </div>
        <div className="text-4xl border-y-2 w-15 h-15 pointer-events-none overflow-hidden">
          {numRange.map((n, i) => (
            <p
              key={`num-${i}`}
              ref={i === numRange.length - 1 ? numsRef : null}
              style={{ transform: `translateY(${num * -48}px)` }}
              className={`text-center my-2  transition-all duration-400 ease-out`}>
              {n}
            </p>
          ))}
        </div>
        <div className="relative w-10 h-10  mx-auto mt-4 overflow-hidden pb-5">
          <div
            onClick={prev}
            className="absolute w-10 h-10 bg-forest-moss rotate-45 -mt-7 rounded-b-md cursor-pointer active:scale-90 duration-200"></div>{" "}
        </div>
      </div>
    </div>
  );
};
