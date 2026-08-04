"use client";

import Form_template from "@/src/components/ui/form/formTemplate";
import Time_table from "@/src/components/ui/form/calender";

const Time_page = () => {
  return (
    <div className="bg-dark-spruce">
      <Form_template text="Time details">
        <div className="w-full h-full">{<Time_table />}</div>
      </Form_template>
    </div>
  );
};

export default Time_page;
