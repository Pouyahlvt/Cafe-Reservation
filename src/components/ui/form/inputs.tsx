"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NormalProps {
  placeHolder: string;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

interface NumProps {
  range: number[];
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const Normal_input = ({ placeHolder, state, setState }: NormalProps) => {
  const [isFocuse, setIsFocuse] = useState(false);
  const textRef = useRef(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const text = textRef.current;
    if (isFocuse || state.length > 0) {
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
  }, [isFocuse, state.length]);

  useGSAP(() => {
    if (!lineRef.current) return;

    gsap.to(lineRef.current, {
      width: "100%",
      duration: 1,
      delay: 0.7,
      ease: "power3.out",
    });
  }, []);
  return (
    <div className="w-full text-forest-moss ">
      <div
        ref={textRef}
        className="absolute mt-4 ml-4 text-2xl opacity-50 pointer-events-none  max-sm:text-xl max-sm:mt-2 ">
        {placeHolder}
      </div>

      <input
        onFocus={() => setIsFocuse(true)}
        onBlur={() => setIsFocuse(false)}
        value={state}
        autoComplete="off"
        onChange={(e) => setState(e.target.value)}
        type="text"
        className="flex w-full text-2xl font-museo py-4 px-4 outline-0 font-semibold 
         rounded-t-2xl z-20 max-sm:text-xl  max-sm:py-2 "
      />
      <div
        ref={lineRef}
        className="w-0 mx-auto h-1 rounded-full bg-forest-moss "></div>
    </div>
  );
};

export const Num_input = ({
  range,
  limit,
  setLimit,
  count,
  setCount,
  setError,
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
      setError("You Reach The limit !");
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
      setError("No Lower , my friend !");
    } else {
      setNum(num - 1);
      setCount(count - 1);
      setLimit((i) => i + 1);
    }
  };

  return (
    <div className="w-full flex justify-center ">
      <div>
        <div className="relative w-10 aspect-square mx-auto mb-4 overflow-hidden pb-5 max-sm:w-5 max-sm:mb-2">
          <div
            onClick={next}
            className="absolute w-10 aspect-square bg-forest-moss rotate-45 mt-7 rounded-md  cursor-pointer active:scale-90 
            duration-200 max-sm:w-5 max-sm:mt-3 "></div>{" "}
        </div>
        <div className="text-4xl border-y-2 w-15 h-15 pointer-events-none overflow-hidden max-sm:text-4xl  max-sm:w-10">
          {numRange.map((n, i) => (
            <p
              key={`num-${i}`}
              ref={i === numRange.length - 1 ? numsRef : null}
              style={{ transform: `translateY(${num * -48}px)` }}
              className={`text-center my-2  transition-all duration-400 ease-out `}>
              {n}
            </p>
          ))}
        </div>
        <div className="relative w-10 aspect-square mx-auto mt-4 overflow-hidden pb-5 max-sm:w-5 max-sm:mt-2">
          <div
            onClick={prev}
            className="absolute w-10 aspect-square bg-forest-moss rotate-45 -mt-7 rounded-b-md cursor-pointer active:scale-90 
            duration-200 max-sm:w-5 max-sm:-mt-3"></div>{" "}
        </div>
      </div>
    </div>
  );
};
