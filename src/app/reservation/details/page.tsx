"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import HoverButton from "@/src/components/ui/button";
import { Normal_input, Num_input } from "@/src/components/ui/form/inputs";

const DetailReservation = () => {
  return (
    <div className="w-full h-screen bg-dark-spruce font-museo text-forest-moss">
      <Form_template text="Fill parts">
        <div className="w-full mx-auto h-[80%] justify-center mt-20">
          <div className="flex">
            <div className="w-[60%] px-15">
              <p className="text-2xl mb-5 ml-2">What we should call you ?</p>
              {<Normal_input placeHolder="Enter your name " />}
            </div>
            <div className="w-[40%] flex justify-center gap-20">
              <div className="">
                <p className="text-center text-2xl">People</p>
                {<Num_input range={[0, 12]} />}
              </div>
              <div>
                <p className="text-center text-2xl">Under 8</p>
                {<Num_input range={[0, 11]} />}
              </div>
            </div>
          </div>
          {
            <HoverButton
              text="Let's go"
              BclassName="text-4xl border-2 w-[80%] mt-15 mx-auto h-22 rounded-full border-forest-moss"
              TclassName="button-text-email text-5xl text-forest-moss font-bold"
              scaleNum={55}
              bgClass="bg-sega-green"
            />
          }
        </div>
      </Form_template>
    </div>
  );
};

export default DetailReservation;
