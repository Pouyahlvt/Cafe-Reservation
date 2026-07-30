"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import { Normal_input, Num_input } from "@/src/components/ui/form/inputs";

const DetailReservation = () => {
  return (
    <div className="w-full h-screen bg-dark-spruce font-museo text-forest-moss">
      <Form_template text="Fill parts">
        <div className="flex w-full mx-auto h-[80%] justify-center mt-20">
          <div className="w-[80%]">
            {<Normal_input placeHolder="Enter your name " />}
          </div>
          {<Num_input range={[0, 12]} />}
        </div>
      </Form_template>
    </div>
  );
};

export default DetailReservation;
