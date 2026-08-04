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
            onClick={() => setMode("meal")}
            className="text-center text-3xl text-muted-teal w-30 cursor-pointer">
            Meal
          </button>
        </div>
      </div>
      <div
        className={`w-[90%] mx-auto mt-10 rounded-3xl border-2 border-forest-moss 
        ${mode === "date" ? "h-50  bg-forest-moss/30" : "h-15 bg-forest-moss/10"} transition-all duration-500 ease-in-out`}>
        <h2 className="mt-3 text-2xl text-muted-teal text-center">
          Choose your Date .
        </h2>
        <div className="w-[96%] mx-auto h-30 mt-5 rounded-2xl bg-muted-teal flex gap-3 justify-center items-center">
          {[21, 22, 23, 24, 25, 26, 27].map((date, i) => (
            <div
              key={`date-${i}`}
              className={`w-1/8 h-[90%] bg-dark-spruce rounded-xl flex justify-center items-center `}>
              <div className="text-2xl text-forest-moss ">
                {date}
                <p className="text-xl text-center">fri</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-[90%] mx-auto mt-2 rounded-3xl border-2 border-forest-moss 
        ${mode === "date" ? "h-15  bg-forest-moss/10" : "h-50  bg-forest-moss/30"} transition-all duration-500 ease-in-out`}>
        <h2 className="mt-3 text-2xl text-muted-teal text-center">
          Choose your meal time .
        </h2>
      </div>
    </div>
  );
};

export default Time_table;
