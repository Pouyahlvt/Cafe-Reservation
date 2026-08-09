"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import Time_table from "@/src/components/ui/form/timeTable";
import HoverButton from "@/src/components/ui/button";
import { useState } from "react";

const Time_page = () => {
  const [date, setDate] = useState({ day: 0, week: "", month: "" });
  const [meal, setMeal] = useState("");
  return (
    <div className="bg-dark-spruce">
      <Form_template text="Time details">
        <div className="w-full h-full -mt-5">
          {
            <Time_table
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
