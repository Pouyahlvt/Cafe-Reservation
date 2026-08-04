"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import Time_table from "@/src/components/ui/form/timeTable";
import HoverButton from "@/src/components/ui/button";

const Time_page = () => {
  return (
    <div className="bg-dark-spruce">
      <Form_template text="Time details">
        <div className="w-full h-full">
          {<Time_table />}
          {
            <HoverButton
              text="OK "
              BclassName="z-30 mt-20 border-2 border text-forest-moss w-[30%] h-20 rounded-full mx-auto"
              TclassName="button-text-email text-3xl text-forest-moss font-bold "
              scaleNum={25}
              bgClass="bg-sega-green"
            />
          }
        </div>
      </Form_template>
    </div>
  );
};

export default Time_page;
