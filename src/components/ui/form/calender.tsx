"use client";

import { useState } from "react";

const Time_table = () => {
  const [mode, setMode] = useState("date");
  return (
    <div className="w-[80%] h-[50%] mt-10 rounded-xl mx-auto">
      <div className="flex mx-auto w-fit  bg-sega-green/30 py-2 rounded-full">
        <div
          className={`w-30 h-13  bg-forest-moss/30 -mt-2 cursor-pointer border-forest-moss 
          border-2 absolute rounded-full z-10 transition-all duration-500 ease-in-out ${mode === "date" ? "ml-0" : "ml-30"}`}></div>
        <div className="w-fit">
          <button
            onClick={() => setMode("date")}
            className="text-center text-3xl text-muted-teal w-30 cursor-pointer">
            Date
          </button>
        </div>
        <div className="w-fit">
          <button
            onClick={() => setMode("lunch")}
            className="text-center text-3xl text-muted-teal w-30 cursor-pointer">
            lunch
          </button>
        </div>
      </div>
      <div className="w-[90%] h-50  mx-auto mt-10 rounded-3xl border-2 border-forest-moss"></div>
    </div>
  );
};

export default Time_table;
