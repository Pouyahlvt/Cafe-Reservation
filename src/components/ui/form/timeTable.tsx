"use client";

import { useState } from "react";

type Meal = "breakfast" | "lunch" | "dinner";

type DataDay = {
  [x: string]: { lunch: boolean; dinner: boolean; breakfast: boolean };
}[];
type DataMeal = { [x: string]: string[] }[];

interface DateType {
  day: number;
  week: string;
  month: string;
  full_date: string;
}

interface Props {
  data_meal: DataMeal;
  data_day: DataDay;
  arr: DateType[];
  date: DateType;
  setDate: React.Dispatch<
    React.SetStateAction<{
      day: number;
      week: string;
      month: string;
      full_date: string;
    }>
  >;
  meal: string;
  setMeal: React.Dispatch<React.SetStateAction<string>>;
}

const Time_table = ({
  data_meal,
  data_day,
  arr,
  date,
  setDate,
  meal,
  setMeal,
}: Props) => {
  const [mode, setMode] = useState("date");
  const [userDay, setUserDay] = useState<[string, number]>(["", 0]);
  const [userMeal, setUserMeal] = useState<[string, number]>(["", 0]);

  const date_handler = (dateDay: DateType, index: number) => {
    // Check if this date is available for the selected meal
    if (userMeal[0].length > 3) {
      const isDateAvailable = data_meal[userMeal[1]]?.[userMeal[0]]?.some(
        (dateStr) => dateStr === dateDay.full_date,
      );

      // If date is not available for the selected meal, prevent selection
      if (!isDateAvailable) {
        return;
      }
    }

    setDate({
      day: dateDay.day,
      week: dateDay.week,
      month: dateDay.month,
      full_date: dateDay.full_date,
    });
    setUserDay([dateDay.full_date, index]);
  };

  const meal_handler = (FoodMeal: string, index: number) => {
    // Check if this meal is already selected for the current day
    if (userDay[0].length > 3) {
      const isMealTaken =
        data_day[userDay[1]]?.[userDay[0]]?.[FoodMeal as Meal];

      // If meal is already taken for this day, prevent selection
      if (isMealTaken) {
        return;
      }
    }

    setMeal(FoodMeal);
    setUserMeal([FoodMeal, index]);
  };

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
          {arr.map((dateDay, i) => (
            <div
              onClick={() => {
                date_handler(dateDay, i);
              }}
              key={`date-${i}`}
              className={`w-1/8 h-[85%] bg-dark-spruce rounded-xl flex justify-center items-center cursor-pointer mx-auto
               transition-all duration-300 ease-in-out 
               ${
                 date.day === dateDay.day
                   ? "bg-sega-green text-dark-spruce"
                   : " text-forest-moss hover:bg-dark-spruce/80"
               }
               ${
                 !(
                   data_meal[userMeal[1]]?.[userMeal[0]]?.[i] ===
                   dateDay.full_date
                 ) && userMeal[0].length > 3
                   ? "opacity-60 select-none cursor-not-allowed"
                   : ""
               }
               `}>
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
          {["breakfast", "lunch", "dinner"].map((FoodMeal, i) => (
            <button
              onClick={() => {
                meal_handler(FoodMeal, i);
              }}
              key={`meal-${i}`}
              className={` h-7/10 text-2xl  font-semibold flex  items-center justify-center rounded-full cursor-pointer
              transition-all duration-300 ease-out w-1/4 text-dark-spruce 
              ${
                meal === FoodMeal
                  ? "bg-dark-spruce/70 text-muted-teal shadow-2xl/50 -translate-y-2"
                  : "hover:bg-muted-teal  bg-muted-teal/70"
              }
              ${
                data_day[userDay[1]]?.[userDay[0]]?.[FoodMeal as Meal]
                  ? "opacity-55 select-none cursor-not-allowed"
                  : ""
              }
              `}>
              {FoodMeal}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Time_table;
