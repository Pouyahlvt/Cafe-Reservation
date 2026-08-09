"use client";

import { useState } from "react";

interface Props {
  date: { day: number; week: string; month: string };
  setDate: React.Dispatch<
    React.SetStateAction<{ day: number; week: string; month: string }>
  >;
  meal: string;
  setMeal: React.Dispatch<React.SetStateAction<string>>;
}

const Time_table = ({ date, setDate, meal, setMeal }: Props) => {
  const [mode, setMode] = useState("date");
  const toDay = new Date();

  const date_arr = Array.from({ length: 7 }, (_, i: number) => {
    const date = new Date(toDay);
    date.setDate(date.getDate() + i + 1);

    return {
      day: date.getDate(),
      week: date.toString().slice(0, 3),
      month: date.toString().slice(4, 7),
    };
  });
  console.log(date_arr);

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
        className={`w-[90%] mx-auto mt-5 rounded-3xl border-2 border-forest-moss overflow-hidden 
        ${mode === "date" ? "h-45  bg-forest-moss/30" : "h-15 bg-forest-moss/10"} transition-all duration-500 ease-in-out`}>
        <h2 className="mt-3 text-2xl text-muted-teal text-center ">
          Choose your Date .
        </h2>
        <div className="w-[96%] mx-auto h-25 mt-5 rounded-2xl bg-muted-teal flex items-center px-2  ">
          {date_arr.map((dateDay, i) => (
            <div
              onClick={() =>
                setDate({
                  day: dateDay.day,
                  week: dateDay.week,
                  month: dateDay.month,
                })
              }
              key={`date-${i}`}
              className={`w-1/8 h-[85%] bg-dark-spruce rounded-xl flex justify-center items-center cursor-pointer mx-auto
               transition-all duration-300 ease-in-out ${date.day === dateDay.day ? "bg-sega-green text-dark-spruce" : " text-forest-moss hover:bg-dark-spruce/80"}`}>
              <div className="text-2xl  select-none text-center">
                {dateDay.day}
                <p className="text-xl text-center ">{dateDay.week}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-[90%] mx-auto mt-2 rounded-3xl border-2 border-forest-moss overflow-hidden
        ${mode === "date" ? "h-15  bg-forest-moss/10" : "h-40  bg-forest-moss/30"} transition-all duration-500 ease-in-out`}>
        <h2 className="mt-3 text-2xl text-muted-teal text-center">
          Choose your meal time .
        </h2>
        <div className="w-[95%] h-20 gap-7 flex justify-center items-center mt-4">
          {["Breakfast", "Lunch", "Dinner"].map((FoodMeal, i) => (
            <button
              onClick={() => setMeal(FoodMeal)}
              key={`meal-${i}`}
              className={` h-7/10 text-2xl  font-semibold flex  items-center justify-center rounded-full cursor-pointer
              transition-all duration-300 ease-out w-1/4 text-dark-spruce 
              ${meal === FoodMeal ? "bg-dark-spruce/70 text-muted-teal shadow-2xl/50 -translate-y-2" : "hover:bg-muted-teal  bg-muted-teal/70"}`}>
              {FoodMeal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Time_table;
