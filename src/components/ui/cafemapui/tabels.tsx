"use client";

import Image from "next/image";
import { useMemo } from "react";

interface Props {
  x?: number;
  y?: number;
  reserved: boolean;
  table_num?: number;
  size?: number;
  table_id: number;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export const Table = ({
  x = 0,
  y = 0,
  reserved,
  table_id,
  table_num = 2,
  size = 200,
  selected,
  setSelected,
}: Props) => {
  const avaible = useMemo(() => {
    const guests_num = sessionStorage.getItem("guests");
    return Number(guests_num) <= table_num && !reserved;
  }, [reserved, table_num]);

  const clickHandler = () => {
    if (avaible) {
      setSelected(`table-${table_id}`);
    }
  };

  return (
    <div
      style={{ top: y, left: x }}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={clickHandler}
      className={`absolute flex z-10 cursor-pointer transition-all duration-300 
      ease-in-out ${avaible ? "hover:scale-105" : "opacity-60 "} ${table_num === 6 ? "rotate-180" : ""} 
      ${selected === `table-${table_id}` ? "animate-pulse" : selected.length > 2 ? "scale-0" : ""}`}>
      <Image
        loading="eager"
        unoptimized
        src={`/cafemapimages/table${table_num}.png`}
        alt={`table-${table_num}`}
        width={1}
        height={1}
        style={{
          width: `${size}px`,
          height: "auto",
        }}
      />
    </div>
  );
};
