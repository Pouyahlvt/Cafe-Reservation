"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import Time_table from "@/src/components/ui/form/timeTable";
import HoverButton from "@/src/components/ui/button";
import { useState } from "react";

const Time_page = () => {
  const [date, setDate] = useState(0);
  const [meal, setMeal] = useState("");
  return (
    <div className="bg-dark-spruce">
      <Form_template text="Time details">
        <div className="w-full h-full">
          {
            <Time_table
              meal={meal}
              date={date}
              setDate={setDate}
              setMeal={setMeal}
            />
          }
          <div className="flex w-full justify-center items-center">
            <p className="mt-20 text-2xl mr-15 text-forest-moss">{`On ${date > 0 ? date + " 'fri' " : "''Date ''"} for ${meal.length > 1 ? meal : "'Meal'"} `}</p>

            {
              <HoverButton
                text="OK "
                BclassName="z-30 mt-20 border-2 border text-forest-moss w-[30%] h-20 rounded-full "
                TclassName="button-text-email text-3xl text-forest-moss font-bold "
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
