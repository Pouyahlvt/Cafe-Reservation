"use client";

import Image from "next/image";
import { EightTable, TableSix, TableFour, Table } from "./cafemapui/tabels";

const CafeMap = () => {
  return (
    <div className="w-full h-screen ">
      <Image
        width={1400}
        height={1050}
        src={"/cafefloor.jpg"}
        alt={"cafe floor"}
        className="max-md:h-full max-md:object-cover flex z-0"
      />
      <Table table_num={8} x={340} y={35} size={220} reserved={false} />
      <Table table_num={8} x={565} y={35} size={220} reserved={false} />
      <Table table_num={8} x={795} y={35} size={220} reserved={false} />
      <Table table_num={6} x={385} y={780} size={200} reserved={false} />
      <Table table_num={6} x={585} y={780} size={200} reserved={false} />
      <Table table_num={6} x={785} y={780} size={200} reserved={false} />
      <Table table_num={4} x={450} y={300} size={200} reserved={false} />
      <Table table_num={4} x={650} y={300} size={200} reserved={false} />
      <Table table_num={4} x={450} y={500} size={200} reserved={false} />
      <Table table_num={4} x={650} y={500} size={200} reserved={false} />
      <Table table_num={12} x={850} y={330} size={200} reserved={false} />
      <Table table_num={2} x={1050} y={260} size={200} reserved={false} />
      <Table table_num={2} x={1050} y={360} size={200} reserved={false} />
      <Table table_num={2} x={1050} y={460} size={200} reserved={false} />
      <Table table_num={2} x={1050} y={560} size={200} reserved={false} />
    </div>
  );
};

export default CafeMap;
