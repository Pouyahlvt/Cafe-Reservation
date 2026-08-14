"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import Time_table from "@/src/components/ui/form/timeTable";
import HoverButton from "@/src/components/ui/button";
import { useEffect, useState } from "react";

const Time_page = () => {
  const [date, setDate] = useState({
    day: 0,
    week: "",
    month: "",
    full_date: "",
  });
  const [meal, setMeal] = useState("");
  const [tables, setTables] = useState([]);

  // useEffect(() => {
  //   async function get_data(url: string) {
  //     const res = await fetch(url);
  //     if (!res.ok) return;
  //     const data = res.json();

  //     setTables([...tables, data]);
  //   }

  //   get_data("api/tables?date=2026-08-15&meal=lunch");
  //   console.log(tables);
  // });

  const toDay = new Date();

  const date_arr = Array.from({ length: 7 }, (_, i: number) => {
    const date = new Date(toDay);
    date.setDate(date.getDate() + i + 1);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return {
      day: date.getDate(),
      week: date.toString().slice(0, 3),
      month: date.toString().slice(4, 7),
      full_date: formattedDate,
    };
  });

  return (
    <div className="bg-dark-spruce">
      <Form_template text="Time details">
        <div className="w-full h-full -mt-5">
          {
            <Time_table
              arr={date_arr}
              date={date}
              meal={meal}
              setDate={setDate}
              setMeal={setMeal}
            />
          }
          <div className="flex relative  w-full justify-center items-center">
            <p className="-mt-14  w-full flex  justify-center text-2xl absolute  text-forest-moss">
              {`Reserve ${date.day > 0 ? " on " + date.week + " " + date.day + " " + date.month : "''Date ''"} for 
              ${meal.length > 1 ? meal : "'Meal'"} `}
            </p>

            {
              <HoverButton
                text="Let's Go"
                BclassName="flex absolute z-30 mt-20 border-2 border text-forest-moss w-[30%] h-20 rounded-full "
                TclassName="button-text-email text-3xl text-forest-moss font-bold select-none"
                scaleNum={25}
                bgClass="bg-sega-green"
              />
            }
          </div>
        </div>
      </Form_template>
    </div>
  );
};

export default Time_page;
