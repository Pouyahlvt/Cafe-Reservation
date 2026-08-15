"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import Time_table from "@/src/components/ui/form/timeTable";
import HoverButton from "@/src/components/ui/button";
import { useEffect, useState } from "react";

export interface Table {
  id: number;
  table_id: number;
  date: string;
  breakfast_reserved: boolean;
  lunch_reserved: boolean;
  dinner_reserved: boolean;
  table_num: number;
  x: number;
  y: number;
  size: number;
}

const Time_page = () => {
  const [date, setDate] = useState({
    day: 0,
    week: "",
    month: "",
    full_date: "",
  });
  const [meal, setMeal] = useState("");
  const [tables, setTables] = useState<Table[]>([]);
  const [guestsNum, setGuestsNum] = useState(0);
  const [Error, setError] = useState("");

  useEffect(() => {
    const num_guests = sessionStorage.getItem("guests");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGuestsNum(Number(num_guests));

    try {
      async function get_data() {
        const res = await fetch("http://localhost:3000/api/tables/all");
        if (!res.ok) return;
        const data = await res.json();

        setTables(data);
      }

      get_data();
    } catch (err) {
      console.error("my Error : " + err);
    }
  }, []);

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

  const day_status = Array.from({ length: 7 }, (_, i) => {
    const lunch_tables = tables.filter(
      (table) =>
        table.table_num >= guestsNum &&
        !table.lunch_reserved &&
        table.date.includes(date_arr[i].full_date),
    );
    const dinner_tables = tables.filter(
      (table) =>
        table.table_num >= guestsNum &&
        !table.lunch_reserved &&
        table.date.includes(date_arr[i].full_date),
    );
    const breakfast_tables = tables.filter(
      (table) =>
        table.table_num >= guestsNum &&
        !table.lunch_reserved &&
        table.date.includes(date_arr[i].full_date),
    );

    return {
      [date_arr[i].full_date]: {
        lunch: lunch_tables.length > 0 ? false : true,
        dinner: dinner_tables.length > 0 ? false : true,
        breakfast: breakfast_tables.length > 0 ? false : true,
      },
    };
  });

  const meal_status = Array.from({ length: 3 }, (_, i) => {
    const meals = ["breakfast", "lunch", "dinner"];

    const lunch_days = Array.from({ length: 7 }, (_, i) => {
      if (!Object.values(day_status[i])[0].lunch) {
        return Object.keys(day_status[i])[0];
      } else {
        return Object.keys(day_status[i])[0] + "is full";
      }
    });

    const dinner_days = Array.from({ length: 7 }, (_, i) => {
      if (!Object.values(day_status[i])[0].dinner) {
        return Object.keys(day_status[i])[0];
      } else {
        return Object.keys(day_status[i])[0] + "is full";
      }
    });

    const breakfast_days = Array.from({ length: 7 }, (_, i) => {
      if (!Object.values(day_status[i])[0].breakfast) {
        return Object.keys(day_status[i])[0];
      } else {
        return Object.keys(day_status[i])[0] + "is full";
      }
    });

    const all_dates = [[...breakfast_days], [...lunch_days], [...dinner_days]];

    return {
      [meals[i]]: all_dates[i],
    };
  });

  console.log(meal_status);

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
