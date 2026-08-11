"use client";

import Image from "next/image";
const CafeMap = () => {
  return (
    <div className="w-full h-screen">
      <Image
        width={1400}
        height={10}
        src={"/cafefloor.jpg"}
        alt={"cafe floor"}
        className="h-full object-cover fix flex z-0"
      />
    </div>
  );
};

export default CafeMap;
